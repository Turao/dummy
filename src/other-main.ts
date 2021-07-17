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

import { PrometheusClient } from "./libs/metrics/PrometheusClient";
const MetricsClient = new PrometheusClient(AppLogger);
MetricsClient.start();

import { DeliveryApp } from "./delivery/DeliveryApp";
import express from "express";
import { ExpressServer } from "./libs/server/express/ExpressServer";

const app = new DeliveryApp(
  new ExpressServer(express(), { port: 3000 }, AppLogger),
  {},
  AppLogger
);

app.start();
