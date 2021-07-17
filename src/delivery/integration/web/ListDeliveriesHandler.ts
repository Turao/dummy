import { Logger } from "../../../libs/logging/core/Logger";
import { Handler } from "../../../libs/server/core/Handler";
import { ListDeliveriesQuery } from "../../usecases/list-deliveries/interfaces";

type Request = Record<string, never>;

type Response = {
  deliveries: {
    readonly id: string;
    readonly name: string;
    readonly completed: boolean;
  }[];
};

export class ListDeliveryHandler implements Handler<Request, Response> {
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
        id: delivery.id,
        name: delivery.name,
        completed: delivery.isComplete(),
      })),
    };
  }
}
