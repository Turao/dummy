import { Entity } from "../../core/Entity";

export type DeliveryID = string;

export class Delivery implements Entity<DeliveryID> {
  public readonly id: DeliveryID;
  public readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
