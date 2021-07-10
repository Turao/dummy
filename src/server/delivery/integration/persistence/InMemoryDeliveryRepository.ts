import { Logger } from "../../../../logging/core/Logger";
import { Delivery } from "../../domain/Delivery";
import { DeliveryRepository } from "../../domain/DeliveryRepository";

export class InMemoryDeliveryRepository implements DeliveryRepository {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async findAll(): Promise<Delivery[]> {
    this.logger.debug("finding all deliveries...");
    return Promise.resolve([]);
  }

  async findByID(deliveryID: string): Promise<Delivery | null> {
    this.logger.debug("finding delivery by ID:", deliveryID);
    return Promise.resolve(null);
  }

  async insert(delivery: Delivery): Promise<void> {
    this.logger.debug("inserting delivery:", delivery);
    return Promise.resolve();
  }

  async deleteByID(deliveryID: string): Promise<void> {
    this.logger.debug("deleting delivery by ID:", deliveryID);
    return Promise.resolve();
  }
}
