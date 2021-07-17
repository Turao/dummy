import { NodeTracerProvider } from "@opentelemetry/node";
import { SimpleSpanProcessor } from "@opentelemetry/tracing";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";

import { Logger } from "../logging/core/Logger";
import { Client } from "./Client";
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector-grpc";

export class OpenTelemetryClient implements Client {
  private readonly logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }

  start(): void {
    this.logger.info("starting OpenTelemetry client...");

    const provider = new NodeTracerProvider();

    const exporter = new CollectorTraceExporter();

    const processor = new SimpleSpanProcessor(exporter);
    provider.addSpanProcessor(processor);

    provider.register();

    registerInstrumentations({
      instrumentations: [getNodeAutoInstrumentations()],
    });
  }
}
