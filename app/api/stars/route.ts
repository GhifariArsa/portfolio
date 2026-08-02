import { NextRequest, NextResponse } from 'next/server';

// GitHub star count, proxied so the request is made (and cached for an hour,
// shared across all visitors) by the server rather than by every visitor's
// browser. Falls back to a cached third-party count when the GitHub API
// rate-limits us, so the badge still renders.
export const revalidate = 3600; // 1 hour

async function fromGitHub(repo: string): Promise<number | null> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return typeof data.stargazers_count === 'number' ? data.stargazers_count : null;
}

async function fromShields(repo: string): Promise<number | null> {
  const res = await fetch(`https://img.shields.io/github/stars/${repo}.json`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const n = Number.parseInt(String(data.value ?? data.message ?? ''), 10);
  return Number.isFinite(n) ? n : null;
}

export async function GET(req: NextRequest) {
  const repo = req.nextUrl.searchParams.get('repo') || '';
  // Only allow a bare "owner/repo" slug.
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    return NextResponse.json({ error: 'invalid repo' }, { status: 400 });
  }

  const stars = (await fromGitHub(repo)) ?? (await fromShields(repo));

  return NextResponse.json(
    { stars },
    { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } },
  );
}
