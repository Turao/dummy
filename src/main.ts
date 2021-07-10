import { TSLogger } from "./logging/tslog/TSLogger";
import { Logger as TSLog } from "tslog";

import { DeliveryServer } from "./server/delivery/DeliveryServer";

import { AsyncLocalStorage } from "async_hooks";
import { LoggingContext } from "./logging/core/Context";
import { RXEventBus } from "./events/rx/RXEventBus";
import { RXPublisher } from "./events/rx/RXPublisher";
import { RXSubscriber } from "./events/rx/RXSubscriber";
import { DeliveryCreated } from "./server/delivery/events/DeliveryCreated";
import { DeliveryDeleted } from "./server/delivery/events/DeliveryDeleted";
import { DeliveryCompleted } from "./server/delivery/events/DeliveryCompleted";

const context: AsyncLocalStorage<LoggingContext> = new AsyncLocalStorage();

const logger = new TSLogger(new TSLog(), context, {
  level: "debug",
  pretty: true,
});

const deliveryServer = new DeliveryServer(
  {
    port: Number(process.env.SERVER_PORT) | 8080,
  },
  logger
);

const start = async () => {
  const EventBus = new RXEventBus({
    size: 10,
  });

  const deliveryCreatedPublisher = new RXPublisher<DeliveryCreated>(
    "delivery.created",
    EventBus,
    logger
  );
  const deliveryCreatedSubscriber = new RXSubscriber<DeliveryCreated>(
    "delivery.created",
    EventBus,
    logger
  );

  const deliveryDeletedPublisher = new RXPublisher<DeliveryDeleted>(
    "delivery.deleted",
    EventBus,
    logger
  );

  const deliveryDeletedSubscriber = new RXSubscriber<DeliveryCreated>(
    "delivery.deleted",
    EventBus,
    logger
  );

  deliveryCreatedSubscriber.subscribe(
    deliveryServer.deliveryCreatedEventHandler
  );

  deliveryCreatedPublisher.publish({
    correlationId: "correlation-id-0",
    eventId: "event-id-0",
    eventName: "delivery.created",
    deliveryId: "id-0",
    deliveryName: "my-event-delivery-name",
  });

  deliveryCreatedPublisher.publish({
    correlationId: "correlation-id-1",
    eventId: "event-id-1",
    eventName: "delivery.created",
    deliveryId: "id-1",
    deliveryName: "ahoy-name",
  });

  deliveryDeletedPublisher.publish({
    correlationId: "correlation-id-3",
    eventId: "event-id-3",
    eventName: "delivery.deleted",
    deliveryId: "id-0",
  });

  deliveryDeletedSubscriber.subscribe(
    deliveryServer.deliveryDeletedEventHandler
  );

  const deliveryCompletedPublisher = new RXPublisher<DeliveryCompleted>(
    "delivery.completed",
    EventBus,
    logger
  );

  deliveryCompletedPublisher.publish({
    correlationId: "correlation-id-1",
    eventId: "event-id-1",
    eventName: "delivery.completed",
    deliveryId: "id-1",
  });

  const before = await deliveryServer.listDeliveriesController.handle({});
  logger.info(before);

  const deliveryCompletedSubscriber = new RXSubscriber<DeliveryCompleted>(
    "delivery.completed",
    EventBus,
    logger
  );

  deliveryCompletedSubscriber.subscribe(
    deliveryServer.deliveryCompletedEventHandler
  );

  const after = await deliveryServer.listDeliveriesController.handle({});
  logger.info(after);
};

start();
