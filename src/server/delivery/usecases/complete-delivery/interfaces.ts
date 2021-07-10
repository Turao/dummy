import { Command } from "../../../core/UseCase";

export interface CompleteDeliveryRequest {
  deliveryId: string;
}

export type CompleteDelivery = Command<CompleteDeliveryRequest>;
