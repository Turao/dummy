import { Logger } from "../../../../logging/core/Logger";
import { Controller } from "../../../core/Controller";
import { GetDeliveryQuery } from "../../usecases/get-delivery/interface";

export type GetDeliveryRequestDTO = {
  deliveryID: string;
};

export type GetDeliveryResponseDTO = {
  deliveryID: string;
  name: string;
} | null;

export class GetDeliveryController
  implements Controller<GetDeliveryRequestDTO, GetDeliveryResponseDTO>
{
  private readonly getDelivery: GetDeliveryQuery;
  private readonly logger: Logger;

  constructor(getDelivery: GetDeliveryQuery, logger: Logger) {
    this.getDelivery = getDelivery;
    this.logger = logger;
  }

  async handle(
    request: GetDeliveryRequestDTO
  ): Promise<GetDeliveryResponseDTO> {
    this.logger.debug("handling GetDelivery request", { request });
    const delivery = await this.getDelivery.execute({ deliveryId: "test" });
    this.logger.debug("got", delivery);

    return delivery ? { deliveryID: delivery.id, name: delivery.name } : null;
  }
}
