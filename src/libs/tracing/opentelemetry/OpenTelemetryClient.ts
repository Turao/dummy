import { NodeTracerProvider } from "@opentelemetry/node";
import { Resource } from "@opentelemetry/resources";
import { ResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor } from "@opentelemetry/tracing";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";

import { Logger } from "../../logging/core/Logger";
import { Client } from "../core/Client";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";

interface Config {
  name: string;
}

export class OpenTelemetryClient implements Client {
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  start(): void {
    this.logger.info("starting OpenTelemetry client...");

    const provider = new NodeTracerProvider({
      resource: new Resource({
        [ResourceAttributes.SERVICE_NAME]: this.config.name,
      }),
    });

    const exporter = new JaegerExporter();

    const processor = new SimpleSpanProcessor(exporter);
    provider.addSpanProcessor(processor);

    provider.register();

    registerInstrumentations({
      instrumentations: [getNodeAutoInstrumentations()],
    });
  }
}
