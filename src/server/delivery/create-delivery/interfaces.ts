import { Command } from "../../core/interfaces";

export interface CreateDeliveryRequest {
  name: string;
}

export type CreateDeliveryCommand = Command<CreateDeliveryRequest>;
