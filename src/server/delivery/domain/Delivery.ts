import { v4 as uuid } from "uuid";

export type DeliveryID = string;

export class Delivery {
  private readonly id: DeliveryID;

  constructor(name: string) {
    this.id = uuid();
  }
}
