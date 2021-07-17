import { Query } from "../../../libs/other/UseCase";
import { Delivery } from "../../domain/Delivery";

export type ListDeliveriesResponse = Delivery[];

export type ListDeliveriesQuery = Query<void, ListDeliveriesResponse>;
