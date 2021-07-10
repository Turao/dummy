import { Logger } from "../../../../logging/core/Logger";
import { Controller } from "../../../core/Controller";
import { ListDeliveriesQuery } from "../../usecases/list-deliveries/interfaces";

type Request = Record<string, never>;

type Response = {
  deliveries: {
    readonly deliveryId: string;
    readonly deliveryName: string;
  }[];
};

export class ListDeliveryController implements Controller<Request, Response> {
  private readonly deliveryLister: ListDeliveriesQuery;
  private readonly logger: Logger;

  constructor(deliveryLister: ListDeliveriesQuery, logger: Logger) {
    this.deliveryLister = deliveryLister;
    this.logger = logger;
  }

  async handle(request: Request): Promise<Response> {
    this.logger.debug("handling ListDelivery request", request);
    const deliveries = await this.deliveryLister.execute();

    return {
      deliveries: deliveries.map((delivery) => ({
        deliveryId: delivery.id,
        deliveryName: delivery.name,
      })),
    };
  }
}
