import { Command } from "../../../libs/server/core/UseCase";

export interface CompleteDeliveryRequest {
  deliveryId: string;
}

export type CompleteDelivery = Command<CompleteDeliveryRequest>;
