import { Event } from "../../../events/core/Event";

export interface DeliveryDeleted extends Event {
  readonly deliveryId: string;
}
