import { Query } from "../../../core/UseCase";
import { Delivery } from "../../domain/Delivery";

export type ListDeliveriesResponse = Delivery[];

export type ListDeliveriesQuery = Query<void, ListDeliveriesResponse>;
