import { TSLogger } from "./logging/tslog/TSLogger";
import { Logger as TSLog } from "tslog";
import { DeliveryServer } from "./server/delivery/DeliveryServer";
import { AMQPClient } from "./messaging/amqplib/Client";

const logger = new TSLogger(new TSLog(), {
  format: "human",
  level: "debug",
});

const deliveryServer = new DeliveryServer(
  {
    port: Number(process.env.SERVER_PORT) | 8080,
  },
  logger
);

const start = async () => {
  // await deliveryServer.createDeliveryController.handle({
  //   name: "new-delivery",
  // });

  // await deliveryServer.listDeliveriesController.handle({});

  // await deliveryServer.getDeliveryController.handle({
  //   deliveryID: "uuid-here",
  // });

  // await deliveryServer.deleteDeliveryController.handle({
  //   deliveryID: "to-be-deleted",
  // });

  // await deliveryServer.serve();

  const amqpClient = new AMQPClient(
    {
      protocol: "amqp",
      host: "localhost",
      port: 5672,
      user: "guest",
      password: "guest",
    },
    logger
  );

  await amqpClient.connect();
};

start();
