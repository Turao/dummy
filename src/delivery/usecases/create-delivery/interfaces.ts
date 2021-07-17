import { Command } from "../../../libs/other/UseCase";

export type CreateDeliveryRequest = {
  id: string;
  name: string;
};

export type CreateDeliveryCommand = Command<CreateDeliveryRequest>;
