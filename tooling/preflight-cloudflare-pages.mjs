import { pathToFileURL } from "node:url";

export async function preflightPages(env = process.env, fetcher = fetch) {
  const account = env.CLOUDFLARE_ACCOUNT_ID;
  const token = env.CLOUDFLARE_API_TOKEN;
  if (!/^[a-f0-9]{32}$/u.test(account ?? "") || typeof token !== "string" || !token.trim()) {
    throw new Error("Pages credential configuration is missing or invalid.");
  }
  const base = `https://api.cloudflare.com/client/v4/accounts/${account}/pages/projects/openings-dev-web`;
  async function read(path) {
    // Never expose provider bodies, credentials, or transport exception details.
    let response;
    let payload;
    try {
      response = await fetcher(`${base}${path}`, {
        method: "GET",
        redirect: "error",
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error();
      payload = await response.json();
    } catch {
      throw new Error("Pages preflight request failed; verify project access and credentials.");
    }
    if (payload?.success !== true || !payload.result) {
      throw new Error("Pages preflight API verification failed.");
    }
    return payload.result;
  }
  const project = await read("");
  if (project.name !== "openings-dev-web" || project.production_branch !== "production") {
    throw new Error("Pages production project does not match the deployment target.");
  }
  // This GET verifies Pages Write access without uploading assets or deploying.
  // The short-lived token stays in memory and is deliberately not returned.
  const upload = await read("/upload-token");
  if (typeof upload.jwt !== "string" || !upload.jwt.trim()) {
    throw new Error("Pages upload permission could not be verified.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await preflightPages();
    console.log("Pages production target and upload access verified; no deployment performed.");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
