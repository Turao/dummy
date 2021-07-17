import { Logger } from "../../../libs/logging/core/Logger";
import { Handler } from "../../../libs/server/core/Handler";
import { GetDeliveryQuery } from "../../usecases/get-delivery/interface";

interface Request {
  readonly deliveryId: string;
}

type Response =
  | {
      readonly deliveryId: string;
      readonly deliveryName: string;
    }
  | Record<string, never>;

export class GetDeliveryHandler implements Handler<Request, Response> {
  private readonly deliveryGetter: GetDeliveryQuery;
  private readonly logger: Logger;

  constructor(deliveryGetter: GetDeliveryQuery, logger: Logger) {
    this.deliveryGetter = deliveryGetter;
    this.logger = logger;
  }

  async handle(request: Request): Promise<Response> {
    this.logger.debug("handling GetDelivery request", request);
    const delivery = await this.deliveryGetter.execute({
      deliveryId: request.deliveryId,
    });

    return delivery
      ? {
          deliveryId: delivery.id,
          deliveryName: delivery.name,
        }
      : {};
  }
}
