import { Command } from "../../../core/UseCase";

export type CreateDeliveryRequest = {
  name: string;
};

export type CreateDeliveryCommand = Command<CreateDeliveryRequest>;
