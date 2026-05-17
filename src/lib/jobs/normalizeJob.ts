import type { JobLink, NormalizedJob } from "@/lib/jobs/types";

function fixMojibake(value: string) {
  if (!/[ÃÂ]/.test(value)) {
    return value;
  }

  try {
    const decoded = Buffer.from(value, "latin1").toString("utf8");
    return decoded.includes("�") ? value : decoded;
  } catch {
    return value;
  }
}

function toText(value: unknown, fallback = ""): string {
  return typeof value === "string" ? fixMojibake(value).trim() : fallback;
}

function toLinks(value: unknown): JobLink[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const title = toText((item as Record<string, unknown>).title, "Abrir link");
      const url = toText((item as Record<string, unknown>).link);

      if (!url) {
        return undefined;
      }

      return { title, url } satisfies JobLink;
    })
    .filter((item): item is JobLink => Boolean(item));
}

function getDetectedExtensions(job: Record<string, unknown>) {
  const detectedExtensions = job.detected_extensions;

  if (!detectedExtensions || typeof detectedExtensions !== "object") {
    return [];
  }

  return Object.values(detectedExtensions)
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function normalizeJobResult(
  job: Record<string, unknown>,
  index: number,
): NormalizedJob {
  const id =
    toText(job.job_id) ||
    toText(job.share_link) ||
    `${toText(job.title, "job")}-${index}`;

  return {
    id,
    title: toText(job.title, "Vaga sem título"),
    companyName: toText(job.company_name, "Empresa não informada"),
    location: toText(job.location, "Localização não informada"),
    description: toText(job.description, "Descrição não disponível."),
    thumbnail: toText(job.thumbnail) || undefined,
    via: toText(job.via) || undefined,
    scheduleType:
      toText((job.detected_extensions as Record<string, unknown> | undefined)?.schedule_type) ||
      undefined,
    postedAt:
      toText((job.detected_extensions as Record<string, unknown> | undefined)?.posted_at) ||
      undefined,
    detectedExtensions: getDetectedExtensions(job),
    relatedLinks: toLinks(job.related_links),
    applyOptions: toLinks(job.apply_options),
  };
}

export function normalizeJobResults(rawResponse: Record<string, unknown>) {
  const results = Array.isArray(rawResponse.jobs_results)
    ? rawResponse.jobs_results
    : Array.isArray(rawResponse.google_jobs_results)
      ? rawResponse.google_jobs_results
      : [];

  return results
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item, index) => normalizeJobResult(item, index));
}
