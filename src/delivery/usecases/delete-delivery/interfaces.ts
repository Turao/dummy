import { Command } from "../../../libs/server/core/UseCase";

export type DeleteDeliveryRequest = {
  deliveryId: string;
};

export type DeleteDeliveryCommand = Command<DeleteDeliveryRequest>;
