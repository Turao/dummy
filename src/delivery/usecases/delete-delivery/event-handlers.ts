import { Handler } from "../../../libs/events/core/Handler";
import { Logger } from "../../../libs/logging/core/Logger";
import { DeliveryDeleted } from "../../events/DeliveryDeleted";
import { DeleteDeliveryCommand } from "./interfaces";

export class DeliveryDeletedEventHandler implements Handler<DeliveryDeleted> {
  private readonly deleteDelivery: DeleteDeliveryCommand;
  private readonly logger: Logger;

  constructor(deleteDelivery: DeleteDeliveryCommand, logger: Logger) {
    this.deleteDelivery = deleteDelivery;
    this.logger = logger;
  }

  async handle(event: DeliveryDeleted): Promise<void> {
    this.logger.setContext({
      ...this.logger.getContext(),
      correlationId: event.correlationId,
    });
    this.logger.debug("handling delivery deleted event", { event });
    await this.deleteDelivery.execute({
      deliveryId: event.deliveryId,
    });
  }
}
