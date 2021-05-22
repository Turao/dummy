import { Logger } from "../../../logger/logger";
import { Handler } from "../../core/interfaces";
import { DeleteDeliveryCommand } from "./interfaces";

export class DeleteDeliveryHandler implements Handler {
  private readonly deleteDelivery: DeleteDeliveryCommand;
  private readonly logger: Logger;

  constructor(deleteDelivery: DeleteDeliveryCommand, logger: Logger) {
    this.deleteDelivery = deleteDelivery;
    this.logger = logger;
  }

  async handle(request: unknown): Promise<unknown> {
    this.logger.debug("handling DeleteDelivery request", { request });
    const response = await this.deleteDelivery.execute({ deliveryId: "test" });
    this.logger.debug("got", response);

    return response;
  }
}
