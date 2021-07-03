import { Command } from "../../../core/UseCase";

export type DeleteDeliveryRequest = {
  deliveryId: string;
};

export type DeleteDeliveryCommand = Command<DeleteDeliveryRequest>;
