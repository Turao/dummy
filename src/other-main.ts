import { TSLogger } from "./libs/logging/tslog/TSLogger";
import { Logger as TSLog } from "tslog";
import { AsyncLocalStorage } from "async_hooks";

const AppLogger = new TSLogger(new TSLog(), new AsyncLocalStorage(), {
  level: "debug",
  pretty: true,
});

import { OpenTelemetryClient } from "./libs/tracing/OpenTelemetryTracing";
const TracingClient = new OpenTelemetryClient({ name: "ahoy2" }, AppLogger);
TracingClient.start();

import { PrometheusClient } from "./metrics/PrometheusClient";
const MetricsClient = new PrometheusClient(AppLogger);
MetricsClient.start();

import { MyExpressServer } from "./libs/server";
import express from "express";

const server = new MyExpressServer(express(), { port: 3000 }, AppLogger);

server.serve();
