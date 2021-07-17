import { Event } from "../../libs/events/core/Event";

export interface DeliveryCompleted extends Event {
  readonly deliveryId: string;
}
