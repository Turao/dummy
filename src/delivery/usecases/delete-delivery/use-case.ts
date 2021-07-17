import { Logger } from "../../../libs/logging/core/Logger";
import { DeliveryRepository } from "../../domain/DeliveryRepository";
import { DeleteDeliveryCommand, DeleteDeliveryRequest } from "./interfaces";

export class DeliveryDeleter implements DeleteDeliveryCommand {
  private readonly logger: Logger;
  private readonly deliveryRepository: DeliveryRepository;

  constructor(deliveryRepository: DeliveryRepository, logger: Logger) {
    this.deliveryRepository = deliveryRepository;
    this.logger = logger;
  }

  async execute(request: DeleteDeliveryRequest): Promise<void> {
    this.logger.debug("deleting delivery", request.deliveryId);
    await this.deliveryRepository.deleteByID(request.deliveryId);
  }
}
