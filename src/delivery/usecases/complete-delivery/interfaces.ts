import { Command } from "../../../libs/patterns/UseCase";

export interface CompleteDeliveryRequest {
  deliveryId: string;
}

export type CompleteDelivery = Command<CompleteDeliveryRequest>;
