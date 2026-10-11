// Server-side writes to Supabase over its REST API. Only imported by Server
// Actions, so the secret key never reaches the browser (it has no NEXT_PUBLIC_
// prefix, which keeps Next.js from bundling it into client code).

type InsertOptions = {
  // Column with a unique constraint: a row that would duplicate it is skipped
  // instead of failing.
  ignoreDuplicatesOn?: string;
};

export async function insertRow(
  table: string,
  row: Record<string, string | null>,
  { ignoreDuplicatesOn }: InsertOptions = {}
): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    console.error(`[forms] Supabase is not configured: set SUPABASE_URL and SUPABASE_SECRET_KEY. Dropped a ${table} row.`);
    return false;
  }

  const endpoint = new URL(`/rest/v1/${table}`, url);
  if (ignoreDuplicatesOn) endpoint.searchParams.set("on_conflict", ignoreDuplicatesOn);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: key,
        // Legacy service_role keys are JWTs and also go in Authorization; the
        // newer sb_secret_ keys must only be sent as `apikey`.
        ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
        "Content-Type": "application/json",
        Prefer: ignoreDuplicatesOn ? "resolution=ignore-duplicates,return=minimal" : "return=minimal",
      },
      body: JSON.stringify(row),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[forms] Supabase rejected a ${table} row: ${res.status} ${await res.text()}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[forms] Could not reach Supabase for ${table}:`, err);
    return false;
  }
}
