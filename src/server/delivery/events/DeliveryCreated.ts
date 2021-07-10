import { Event } from "../../../events/core/Event";

export interface DeliveryCreated extends Event {
  readonly deliveryId: string;
  readonly deliveryName: string;
}
