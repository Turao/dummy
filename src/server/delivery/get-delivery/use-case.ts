import { Logger } from "../../../logger/logger";
import {
  GetDeliveryQuery,
  GetDeliveryRequest,
  GetDeliveryResponse,
} from "./interfaces";

export class DeliveryGetter implements GetDeliveryQuery {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async execute(request: GetDeliveryRequest): Promise<GetDeliveryResponse> {
    this.logger.debug("getting delivery", request.deliveryId);
    return Promise.resolve({ deliveryId: request.deliveryId });
  }
}
