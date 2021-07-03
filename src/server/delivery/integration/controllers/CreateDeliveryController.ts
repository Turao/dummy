import { Logger } from "../../../../logging/core/Logger";
import { Controller } from "../../../core/Controller";
import { CreateDeliveryCommand } from "../../usecases/create-delivery/interfaces";

export type CreateDeliveryRequestDTO = {
  name: string;
};

export class CreateDeliveryController
  implements Controller<CreateDeliveryRequestDTO, void>
{
  private readonly createDelivery: CreateDeliveryCommand;
  private readonly logger: Logger;

  constructor(createDelivery: CreateDeliveryCommand, logger: Logger) {
    this.createDelivery = createDelivery;
    this.logger = logger;
  }

  async handle(request: CreateDeliveryRequestDTO): Promise<void> {
    this.logger.debug("handling createDelivery request", { request });
    await this.createDelivery.execute({ name: request.name });
  }
}
