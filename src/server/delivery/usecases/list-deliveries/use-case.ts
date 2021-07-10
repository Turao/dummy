import { Logger } from "../../../../logging/core/Logger";
import { DeliveryRepository } from "../../domain/DeliveryRepository";
import { ListDeliveriesQuery, ListDeliveriesResponse } from "./interfaces";

export class DeliveryLister implements ListDeliveriesQuery {
  private readonly logger: Logger;
  private readonly deliveryRepository: DeliveryRepository;

  constructor(deliveryRepository: DeliveryRepository, logger: Logger) {
    this.deliveryRepository = deliveryRepository;
    this.logger = logger;
  }

  async execute(): Promise<ListDeliveriesResponse> {
    this.logger.setContext({
      ...this.logger.getContext(),
    });
    this.logger.debug("listing all deliveries");
    return this.deliveryRepository.findAll();
  }
}
