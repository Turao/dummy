import { Event } from "../../libs/events/core/Event";

export interface DeliveryCreated extends Event {
  readonly deliveryId: string;
  readonly deliveryName: string;
}
