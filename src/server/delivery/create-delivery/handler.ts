import { Logger } from "../../../logger/logger";
import { Handler } from "../../core/interfaces";
import { CreateDeliveryCommand } from "./interfaces";

export class CreateDeliveryHandler implements Handler {
  private readonly createDelivery: CreateDeliveryCommand;
  private readonly logger: Logger;

  constructor(createDelivery: CreateDeliveryCommand, logger: Logger) {
    this.createDelivery = createDelivery;
    this.logger = logger;
  }

  async handle(request: unknown): Promise<unknown> {
    this.logger.debug("handling createDelivery request", { request });
    const response = await this.createDelivery.execute({ name: "delivery" });
    return response;
  }
}
