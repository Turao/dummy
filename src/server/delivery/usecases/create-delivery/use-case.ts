import { Logger } from "../../../../logging/core/Logger";
import { Delivery } from "../../domain/Delivery";
import { DeliveryRepository } from "../../domain/DeliveryRepository";
import { CreateDeliveryCommand, CreateDeliveryRequest } from "./interfaces";

export class DeliveryCreator implements CreateDeliveryCommand {
  private readonly logger: Logger;
  private readonly deliveryRepository: DeliveryRepository;

  constructor(deliveryRepository: DeliveryRepository, logger: Logger) {
    this.deliveryRepository = deliveryRepository;
    this.logger = logger;
  }

  async execute(request: CreateDeliveryRequest): Promise<void> {
    this.logger.debug("creating delivery...", request.name);
    const delivery = new Delivery(request.name);
    this.deliveryRepository.insert(delivery);
  }
}
