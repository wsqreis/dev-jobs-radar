import { loadEnvConfig } from "@next/env";
import { resolveJobSearchRequest } from "@/lib/jobs/presets";
import { searchJobs } from "@/lib/jobs/searchJobs";

loadEnvConfig(process.cwd());

function parseArgs(argv: string[]) {
  const params = new URLSearchParams();

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (!current?.startsWith("--")) {
      continue;
    }

    const key = current.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      params.set(key, "true");
      continue;
    }

    params.set(key, next);
    index += 1;
  }

  return params;
}

async function main() {
  const params = parseArgs(process.argv.slice(2));
  const request = resolveJobSearchRequest(params);
  const response = await searchJobs(request);

  console.log("\nDev Jobs Radar CLI\n");
  console.log(`Modo: ${response.meta.resolvedMode}`);
  console.log(`Fonte: ${response.meta.source}`);
  console.log(`Busca: ${response.request.query}`);
  console.log(`Local: ${response.request.location}`);
  console.log(`Resultados: ${response.meta.totalJobs}\n`);

  response.jobs.forEach((job, index) => {
    console.log(`${index + 1}. ${job.title}`);
    console.log(`   Empresa: ${job.companyName}`);
    console.log(`   Local: ${job.location}`);
    if (job.scheduleType) {
      console.log(`   Formato: ${job.scheduleType}`);
    }
    if (job.postedAt) {
      console.log(`   Publicação: ${job.postedAt}`);
    }
    console.log(`   Descrição: ${job.description}`);

    const primaryLink = job.applyOptions[0]?.url ?? job.relatedLinks[0]?.url;
    if (primaryLink) {
      console.log(`   Link: ${primaryLink}`);
    }

    console.log("");
  });

  console.log("Top companies:");
  response.insights.topCompanies.forEach((item) => {
    console.log(`- ${item.name}: ${item.count}`);
  });

  console.log("\nSDK example:\n");
  console.log(response.examples.sdk);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Unexpected CLI error.");
  process.exitCode = 1;
});
