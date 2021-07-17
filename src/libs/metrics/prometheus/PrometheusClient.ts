import { Logger } from "../../logging/core/Logger";
import { Client } from "../core/Client";
import Prometheus from "prom-client";

export class PrometheusClient implements Client {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  start(): void {
    this.logger.info("starting Prometheus client...");
    Prometheus.collectDefaultMetrics();
  }
}
