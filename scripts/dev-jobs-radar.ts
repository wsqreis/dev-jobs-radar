import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

console.log("Dev Jobs Radar CLI will be implemented in the next milestone.");
console.log(`Demo mode: ${process.env.SERPAPI_DEMO_MODE ?? "true"}`);
