import { Command } from "../../../libs/patterns/UseCase";

export type CreateDeliveryRequest = {
  id: string;
  name: string;
};

export type CreateDeliveryCommand = Command<CreateDeliveryRequest>;
