import { Logger } from "../../../logger/logger";
import { Handler } from "../../core/interfaces";
import { ListDeliveriesQuery } from "./interfaces";

export class ListDeliveriesHandler implements Handler {
  private readonly listDeliveries: ListDeliveriesQuery;
  private readonly logger: Logger;

  constructor(listDeliveries: ListDeliveriesQuery, logger: Logger) {
    this.listDeliveries = listDeliveries;
    this.logger = logger;
  }

  async handle(request: unknown): Promise<unknown> {
    this.logger.debug("handling ListDeliveries request", { request });
    const response = await this.listDeliveries.execute();
    this.logger.debug("got", response);

    return response;
  }
}
