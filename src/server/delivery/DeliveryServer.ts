import { Logger } from "../../logging/core/Logger";
import { Server } from "../core/Server";

import { CreateDeliveryHandler } from "./integration/event-handlers/CreateDeliverySubscriber";
import { DeleteDeliveryHandler } from "./integration/event-handlers/DeleteDeliverySubscriber";

import { InMemoryDeliveryRepository } from "./integration/persistence/InMemoryDeliveryRepository";

import { DeliveryCreator } from "./usecases/create-delivery/use-case";
import { DeliveryDeleter } from "./usecases/delete-delivery/use-case";

export interface Config {
  port: number;
}

export const DEFAULT_CONFIG: Config = {
  port: 8080,
};

export const env: Config = {
  port: Number(process.env.SERVER_PORT),
};

export class DeliveryServer implements Server {
  private readonly config: Config;
  private readonly logger: Logger;

  // todo: make them private
  public readonly createDeliveryHandler: CreateDeliveryHandler;
  public readonly deleteDeliveryHandler: DeleteDeliveryHandler;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;

    // init repositories
    const deliveryRepository = new InMemoryDeliveryRepository(logger);

    // register handlers
    this.createDeliveryHandler = new CreateDeliveryHandler(
      new DeliveryCreator(deliveryRepository, logger),
      logger
    );

    this.deleteDeliveryHandler = new DeleteDeliveryHandler(
      new DeliveryDeleter(deliveryRepository, logger),
      logger
    );
  }

  serve(): Promise<void> {
    this.logger.info(`serving DeliveryServer on port ${this.config.port}`);
    return new Promise((resolve) => setTimeout(() => resolve, 3000));
  }
}
