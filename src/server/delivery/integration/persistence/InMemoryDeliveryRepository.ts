import { Logger } from "../../../../logging/core/Logger";
import { Delivery } from "../../domain/Delivery";
import { DeliveryRepository } from "../../domain/DeliveryRepository";

export class InMemoryDeliveryRepository implements DeliveryRepository {
  private readonly deliveries: Record<string, Delivery>;
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.deliveries = {};
    this.logger = logger;
  }

  async findAll(): Promise<Delivery[]> {
    this.logger.debug("finding all deliveries...");
    return Object.values(this.deliveries);
  }

  async findByID(deliveryID: string): Promise<Delivery | null> {
    this.logger.debug("finding delivery by ID:", deliveryID);
    const delivery = this.deliveries[deliveryID];
    return delivery ? delivery : null;
  }

  async insert(delivery: Delivery): Promise<void> {
    this.logger.debug("inserting delivery:", delivery);
    if (this.deliveries[delivery.id]) {
      throw Error("delivery already exists");
    }
    this.deliveries[delivery.id] = delivery;
  }

  async deleteByID(deliveryID: string): Promise<void> {
    this.logger.debug("deleting delivery by ID:", deliveryID);
    if (!this.deliveries[deliveryID]) {
      throw Error("delivery does not exist");
    }

    delete this.deliveries[deliveryID];
  }

  async update(delivery: Delivery): Promise<void> {
    this.logger.debug("updating delivery:", delivery);
    if (!this.deliveries[delivery.id]) {
      throw Error("delivery does not exist");
    }

    this.deliveries[delivery.id] = delivery;
  }
}
