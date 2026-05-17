import { getJson, type BaseResponse } from "serpapi";

export async function runSerpApiSearch(
  params: Record<string, string | number | boolean | undefined>,
): Promise<BaseResponse> {
  return getJson(params);
}
