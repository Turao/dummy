import { Query } from "../../core/interfaces";

export interface GetDeliveryRequest {
  deliveryId: string;
}

export interface GetDeliveryResponse {
  deliveryId: string;
}

export type GetDeliveryQuery = Query<GetDeliveryRequest, GetDeliveryResponse>;
