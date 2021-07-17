import { Query } from "../../../libs/server/core/UseCase";
import { Delivery } from "../../domain/Delivery";

export type ListDeliveriesResponse = Delivery[];

export type ListDeliveriesQuery = Query<void, ListDeliveriesResponse>;
