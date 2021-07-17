import { Command } from "../../../libs/other/UseCase";

export type DeleteDeliveryRequest = {
  deliveryId: string;
};

export type DeleteDeliveryCommand = Command<DeleteDeliveryRequest>;
