import { Command } from "../../core/interfaces";

export interface DeleteDeliveryRequest {
  deliveryId: string;
}

export type DeleteDeliveryCommand = Command<DeleteDeliveryRequest>;
