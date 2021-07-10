import { Handler } from "../../../../events/core/Handler";
import { Logger } from "../../../../logging/core/Logger";
import { Controller } from "../../../core/Controller";
import { DeliveryDeleted } from "../../events/DeliveryDeleted";
import { DeleteDeliveryCommand } from "../../usecases/delete-delivery/interfaces";

export class DeleteDeliveryHandler implements Handler<DeliveryDeleted> {
  private readonly deleteDelivery: DeleteDeliveryCommand;
  private readonly logger: Logger;

  constructor(deleteDelivery: DeleteDeliveryCommand, logger: Logger) {
    this.deleteDelivery = deleteDelivery;
    this.logger = logger;
  }

  async handle(event: DeliveryDeleted): Promise<void> {
    this.logger.debug("handling delivery deleted event", { event });
    await this.deleteDelivery.execute({
      deliveryId: event.deliveryId,
    });
  }
}
