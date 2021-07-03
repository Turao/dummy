import { Query } from "../../../core/UseCase";
import { Delivery } from "../../domain/Delivery";

export type GetDeliveryRequest = {
  deliveryId: string;
};

export type GetDeliveryResponse = Delivery | null;

export type GetDeliveryQuery = Query<GetDeliveryRequest, GetDeliveryResponse>;
