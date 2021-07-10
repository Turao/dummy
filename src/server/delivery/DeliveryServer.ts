import { Logger } from "../../logging/core/Logger";
import { Server } from "../core/Server";

import { InMemoryDeliveryRepository } from "./integration/persistence/InMemoryDeliveryRepository";
import { DeliveryCreatedEventHandler } from "./usecases/create-delivery/event-handlers";

import { DeliveryCreator } from "./usecases/create-delivery/use-case";
import { DeliveryDeletedEventHandler } from "./usecases/delete-delivery/event-handlers";
import { DeliveryDeleter } from "./usecases/delete-delivery/use-case";

export interface Config {
  port: number;
}

export class DeliveryServer implements Server {
  private readonly config: Config;
  private readonly logger: Logger;

  // todo: make them private
  public readonly deliveryCreatedEventHandler: DeliveryCreatedEventHandler;
  public readonly deliveryDeletedEventHandler: DeliveryDeletedEventHandler;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;

    // init repositories
    const deliveryRepository = new InMemoryDeliveryRepository(logger);

    // register event handlers
    this.deliveryCreatedEventHandler = new DeliveryCreatedEventHandler(
      new DeliveryCreator(deliveryRepository, logger),
      logger
    );

    this.deliveryDeletedEventHandler = new DeliveryDeletedEventHandler(
      new DeliveryDeleter(deliveryRepository, logger),
      logger
    );
  }

  serve(): Promise<void> {
    this.logger.info(`serving DeliveryServer on port ${this.config.port}`);
    return new Promise((resolve) => setTimeout(() => resolve, 3000));
  }
}
