import { Logger } from "../../../../logging/core/Logger";
import { DeliveryRepository } from "../../domain/DeliveryRepository";
import { CompleteDelivery, CompleteDeliveryRequest } from "./interfaces";

export class DeliveryCompleter implements CompleteDelivery {
  private readonly deliveryRepository: DeliveryRepository;
  private readonly logger: Logger;

  constructor(deliveryRepository: DeliveryRepository, logger: Logger) {
    this.deliveryRepository = deliveryRepository;
    this.logger = logger;
  }

  async execute(request: CompleteDeliveryRequest): Promise<void> {
    this.logger.debug("completing delivery:", request.deliveryId);
    const delivery = await this.deliveryRepository.findByID(request.deliveryId);
    if (!delivery) {
      throw Error("delivery does not exist");
    }

    delivery.complete();
    this.logger.debug("delivery completed:", delivery.id);

    await this.deliveryRepository.update(delivery);
  }
}
