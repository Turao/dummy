import { Query } from "../../../libs/patterns/UseCase";
import { Delivery } from "../../domain/Delivery";

export type ListDeliveriesResponse = Delivery[];

export type ListDeliveriesQuery = Query<void, ListDeliveriesResponse>;
