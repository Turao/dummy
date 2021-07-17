import { Handler } from "../../../libs/events/core/Handler";
import { Logger } from "../../../libs/logging/core/Logger";
import { DeliveryCreated } from "../../events/DeliveryCreated";
import { CreateDeliveryCommand } from "./interfaces";

export class DeliveryCreatedEventHandler implements Handler<DeliveryCreated> {
  private readonly createDelivery: CreateDeliveryCommand;
  private readonly logger: Logger;

  constructor(createDelivery: CreateDeliveryCommand, logger: Logger) {
    this.createDelivery = createDelivery;
    this.logger = logger;
  }

  async handle(event: DeliveryCreated): Promise<void> {
    this.logger.setContext({
      ...this.logger.getContext(),
      correlationId: event.correlationId,
    });
    this.logger.debug("handling delivery created event", { event });
    await this.createDelivery.execute({
      id: event.deliveryId,
      name: event.deliveryName,
    });
  }
}
