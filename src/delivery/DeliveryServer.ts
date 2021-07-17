import { Logger } from "../libs/logging/core/Logger";
import { Server } from "../libs/server/core/Server";

import { InMemoryDeliveryRepository } from "./integration/persistence/InMemoryDeliveryRepository";
import { GetDeliveryController } from "./integration/web/GetDeliveryController";
import { ListDeliveryController } from "./integration/web/ListDeliveriesController";
import { DeliveryCompletedEventHandler } from "./usecases/complete-delivery/event-handlers";
import { DeliveryCompleter } from "./usecases/complete-delivery/use-case";
import { DeliveryCreatedEventHandler } from "./usecases/create-delivery/event-handlers";

import { DeliveryCreator } from "./usecases/create-delivery/use-case";
import { DeliveryDeletedEventHandler } from "./usecases/delete-delivery/event-handlers";
import { DeliveryDeleter } from "./usecases/delete-delivery/use-case";
import { DeliveryGetter } from "./usecases/get-delivery/use-case";
import { DeliveryLister } from "./usecases/list-deliveries/use-case";

export interface Config {
  port: number;
}

export class DeliveryServer implements Server {
  private readonly config: Config;
  private readonly logger: Logger;

  // todo: make them private
  public readonly deliveryCreatedEventHandler: DeliveryCreatedEventHandler;
  public readonly deliveryDeletedEventHandler: DeliveryDeletedEventHandler;
  public readonly deliveryCompletedEventHandler: DeliveryCompletedEventHandler;
  public readonly getDeliveryController: GetDeliveryController;
  public readonly listDeliveriesController: ListDeliveryController;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;

    // init repositories
    const deliveryRepository = new InMemoryDeliveryRepository(logger);

    // initialize controllers
    this.getDeliveryController = new GetDeliveryController(
      new DeliveryGetter(deliveryRepository, logger),
      logger
    );

    this.listDeliveriesController = new ListDeliveryController(
      new DeliveryLister(deliveryRepository, logger),
      logger
    );

    // register event handlers
    this.deliveryCreatedEventHandler = new DeliveryCreatedEventHandler(
      new DeliveryCreator(deliveryRepository, logger),
      logger
    );

    this.deliveryDeletedEventHandler = new DeliveryDeletedEventHandler(
      new DeliveryDeleter(deliveryRepository, logger),
      logger
    );

    this.deliveryCompletedEventHandler = new DeliveryCompletedEventHandler(
      new DeliveryCompleter(deliveryRepository, logger),
      logger
    );
  }

  serve(): Promise<void> {
    this.logger.info(`serving DeliveryServer on port ${this.config.port}`);
    return new Promise((resolve) => setTimeout(() => resolve, 3000));
  }
}
