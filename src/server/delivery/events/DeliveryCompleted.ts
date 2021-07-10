import { Event } from "../../../events/core/Event";

export interface DeliveryCompleted extends Event {
  deliveryId: string;
}
