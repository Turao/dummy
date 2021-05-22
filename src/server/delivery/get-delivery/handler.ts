import { Logger } from "../../../logger/logger";
import { Handler } from "../../core/interfaces";
import { GetDeliveryQuery } from "./interfaces";

export class GetDeliveryHandler implements Handler {
  private readonly getDelivery: GetDeliveryQuery;
  private readonly logger: Logger;

  constructor(getDelivery: GetDeliveryQuery, logger: Logger) {
    this.getDelivery = getDelivery;
    this.logger = logger;
  }

  async handle(request: unknown): Promise<unknown> {
    this.logger.debug("handling GetDelivery request", { request });
    const response = await this.getDelivery.execute({ deliveryId: "test" });
    this.logger.debug("got", response);

    return response;
  }
}
