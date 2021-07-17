import { Command } from "../../../libs/patterns/UseCase";

export type DeleteDeliveryRequest = {
  deliveryId: string;
};

export type DeleteDeliveryCommand = Command<DeleteDeliveryRequest>;
