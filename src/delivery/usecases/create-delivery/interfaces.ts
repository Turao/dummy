import { Command } from "../../../libs/server/core/UseCase";

export type CreateDeliveryRequest = {
  id: string;
  name: string;
};

export type CreateDeliveryCommand = Command<CreateDeliveryRequest>;
