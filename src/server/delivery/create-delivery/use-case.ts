import { Logger } from "../../../logger/logger";
import { Delivery } from "../domain/Delivery";
import { CreateDeliveryCommand, CreateDeliveryRequest } from "./interfaces";

export class DeliveryCreator implements CreateDeliveryCommand {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async execute(request: CreateDeliveryRequest): Promise<void> {
    this.logger.debug("creating delivery...", request.name);
    const delivery = new Delivery(request.name);
    this.logger.debug("delivery created:", { delivery });

    return;
  }
}
