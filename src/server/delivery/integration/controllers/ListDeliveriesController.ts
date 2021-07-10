import { Logger } from "../../../../logging/core/Logger";
import { Controller } from "../../../core/Controller";
import { ListDeliveriesQuery } from "../../usecases/list-deliveries/interfaces";

export type ListDeliveriesRequestDTO = Record<string, never>; // empty object
export type ListDeliveriesResponseDTO = {
  deliveries: { deliveryID: string; name: string }[];
};

export class ListDeliveriesController
  implements Controller<ListDeliveriesRequestDTO, ListDeliveriesResponseDTO>
{
  private readonly listDeliveries: ListDeliveriesQuery;
  private readonly logger: Logger;

  constructor(listDeliveries: ListDeliveriesQuery, logger: Logger) {
    this.listDeliveries = listDeliveries;
    this.logger = logger;
  }

  async handle(
    request: ListDeliveriesRequestDTO
  ): Promise<ListDeliveriesResponseDTO> {
    this.logger.debug("handling ListDeliveries request", { request });
    const deliveries = await this.listDeliveries.execute();

    await new Promise((resolve, reject) => setTimeout(resolve, 2000));

    return {
      deliveries: deliveries.map((d) => ({ deliveryID: d.id, name: d.name })),
    };
  }
}
