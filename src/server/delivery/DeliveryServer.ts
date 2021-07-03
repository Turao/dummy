import { Logger } from "../../logging/core/Logger";
import { Server } from "../core/Server";

import { CreateDeliveryController } from "./integration/controllers/CreateDeliveryController";
import { DeleteDeliveryController } from "./integration/controllers/DeleteDeliveryController";
import { GetDeliveryController } from "./integration/controllers/GetDeliveryController";
import { ListDeliveriesController } from "./integration/controllers/ListDeliveriesController";

import { InMemoryDeliveryRepository } from "./integration/persistence/InMemoryDeliveryRepository";

import { DeliveryCreator } from "./usecases/create-delivery/use-case";
import { DeliveryDeleter } from "./usecases/delete-delivery/use-case";
import { DeliveryGetter } from "./usecases/get-delivery/use-case";
import { DeliveryLister } from "./usecases/list-deliveries/use-case";

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
  public readonly createDeliveryController: CreateDeliveryController;
  public readonly deleteDeliveryController: DeleteDeliveryController;
  public readonly getDeliveryController: GetDeliveryController;
  public readonly listDeliveriesController: ListDeliveriesController;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;

    // init repositories
    const deliveryRepository = new InMemoryDeliveryRepository(logger);

    // register controllers
    this.createDeliveryController = new CreateDeliveryController(
      new DeliveryCreator(deliveryRepository, logger),
      logger
    );

    this.deleteDeliveryController = new DeleteDeliveryController(
      new DeliveryDeleter(deliveryRepository, logger),
      logger
    );

    this.getDeliveryController = new GetDeliveryController(
      new DeliveryGetter(deliveryRepository, logger),
      logger
    );

    this.listDeliveriesController = new ListDeliveriesController(
      new DeliveryLister(deliveryRepository, logger),
      logger
    );
  }

  serve(): Promise<void> {
    this.logger.info(`serving DeliveryServer on port ${this.config.port}`);
    return new Promise((resolve) => setTimeout(() => resolve, 3000));
  }
}
