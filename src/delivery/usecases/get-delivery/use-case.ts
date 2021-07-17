import { Logger } from "../../../libs/logging/core/Logger";
import { DeliveryRepository } from "../../domain/DeliveryRepository";
import {
  GetDeliveryQuery,
  GetDeliveryRequest,
  GetDeliveryResponse,
} from "./interface";

export class DeliveryGetter implements GetDeliveryQuery {
  private readonly logger: Logger;
  private readonly deliveryRepository: DeliveryRepository;

  constructor(deliveryRepository: DeliveryRepository, logger: Logger) {
    this.deliveryRepository = deliveryRepository;
    this.logger = logger;
  }

  async execute(request: GetDeliveryRequest): Promise<GetDeliveryResponse> {
    this.logger.debug("getting delivery", request.deliveryId);
    return this.deliveryRepository.findByID(request.deliveryId);
  }
}
