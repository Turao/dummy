import { v4 as uuid } from "uuid";
import { Entity } from "../../core/Entity";

export type DeliveryID = string;

export class Delivery implements Entity<DeliveryID> {
  public readonly id: DeliveryID;
  public readonly name: string;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }
}
