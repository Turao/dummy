import { Event } from "../../libs/events/core/Event";

export interface DeliveryDeleted extends Event {
  readonly deliveryId: string;
}
