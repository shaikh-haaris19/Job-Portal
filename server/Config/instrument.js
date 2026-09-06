import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://7d1cb5583e94fe59516470a35fde1cf8@o4512039414988800.ingest.us.sentry.io/4512039423115264",
  integrations: [Sentry.mongooseIntegration()],
});