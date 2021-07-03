import { Logger } from "../../../../logging/core/Logger";
import { Controller } from "../../../core/Controller";
import { DeleteDeliveryCommand } from "../../usecases/delete-delivery/interfaces";

export type DeleteDeliveryRequestDTO = {
  deliveryID: string;
};

export class DeleteDeliveryController
  implements Controller<DeleteDeliveryRequestDTO, void>
{
  private readonly deleteDelivery: DeleteDeliveryCommand;
  private readonly logger: Logger;

  constructor(deleteDelivery: DeleteDeliveryCommand, logger: Logger) {
    this.deleteDelivery = deleteDelivery;
    this.logger = logger;
  }

  async handle(request: DeleteDeliveryRequestDTO): Promise<void> {
    this.logger.debug("handling DeleteDelivery request", { request });
    const response = await this.deleteDelivery.execute({
      deliveryId: request.deliveryID,
    });
    this.logger.debug("got", response);
  }
}
