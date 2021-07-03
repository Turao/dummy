import { Delivery, DeliveryID } from "./Delivery";

export interface DeliveryRepository {
  findAll: () => Promise<Delivery[]>;
  findByID: (deliveryID: DeliveryID) => Promise<Delivery | null>;

  insert: (delivery: Delivery) => Promise<void>;
  deleteByID: (deliveryID: DeliveryID) => Promise<void>;
}
