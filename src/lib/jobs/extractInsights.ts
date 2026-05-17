import type { JobsInsights, NormalizedJob } from "@/lib/jobs/types";

function getTopCounts(values: string[]) {
  return [...new Map(
    values
      .filter(Boolean)
      .map((value) => [value, values.filter((item) => item === value).length]),
  )]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
    .slice(0, 5);
}

export function extractInsights(jobs: NormalizedJob[]): JobsInsights {
  return {
    topCompanies: getTopCounts(jobs.map((job) => job.companyName)),
    topLocations: getTopCounts(jobs.map((job) => job.location)),
    topSchedules: getTopCounts(
      jobs.map((job) => job.scheduleType ?? "Não informado"),
    ),
  };
}
