import { Logger } from "../../../logger/logger";
import { ListDeliveriesQuery, ListDeliveriesResponse } from "./interfaces";

export class DeliveryLister implements ListDeliveriesQuery {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async execute(): Promise<ListDeliveriesResponse> {
    this.logger.debug("listing all deliveries");
    return Promise.resolve({});
  }
}
