import { Command } from "../../../core/UseCase";

export type CreateDeliveryRequest = {
  id: string;
  name: string;
};

export type CreateDeliveryCommand = Command<CreateDeliveryRequest>;
