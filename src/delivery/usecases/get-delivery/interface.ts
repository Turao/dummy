import { Query } from "../../../libs/server/core/UseCase";
import { Delivery } from "../../domain/Delivery";

export type GetDeliveryRequest = {
  deliveryId: string;
};

export type GetDeliveryResponse = Delivery | null;

export type GetDeliveryQuery = Query<GetDeliveryRequest, GetDeliveryResponse>;
