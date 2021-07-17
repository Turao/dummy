import { Command } from "../../../libs/other/UseCase";

export interface CompleteDeliveryRequest {
  deliveryId: string;
}

export type CompleteDelivery = Command<CompleteDeliveryRequest>;
