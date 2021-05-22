import { Logger } from "../../../logger/logger";
import { DeleteDeliveryCommand, DeleteDeliveryRequest } from "./interfaces";

export class DeliveryDeleter implements DeleteDeliveryCommand {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async execute(request: DeleteDeliveryRequest): Promise<void> {
    this.logger.debug("deleting delivery", request.deliveryId);
    return Promise.resolve();
  }
}
