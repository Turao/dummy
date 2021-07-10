import { Handler } from "../../../../events/core/Handler";
import { Logger } from "../../../../logging/core/Logger";
import { DeliveryCompleted } from "../../events/DeliveryCompleted";
import { CompleteDelivery } from "./interfaces";

export class DeliveryCompletedEventHandler
  implements Handler<DeliveryCompleted>
{
  private readonly deliveryCompleter: CompleteDelivery;
  private readonly logger: Logger;

  constructor(deliveryCompleter: CompleteDelivery, logger: Logger) {
    this.deliveryCompleter = deliveryCompleter;
    this.logger = logger;
  }

  async handle(event: DeliveryCompleted): Promise<void> {
    this.logger.setContext({
      ...this.logger.getContext(),
      correlationId: event.correlationId,
    });
    this.logger.debug("handling delivery completed event", { event });
    await this.deliveryCompleter.execute({
      deliveryId: event.deliveryId,
    });
  }
}
