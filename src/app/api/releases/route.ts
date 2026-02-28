import { NextResponse } from 'next/server';

const GITHUB_REPO = 'daniilmatso4/wolf-tool';

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  prerelease: boolean;
  body: string | null;
}

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: 'release' | 'beta';
  changes: string[];
}

function parseChanges(body: string | null): string[] {
  if (!body) return [];

  return body
    .split('\n')
    .map((line) => line.replace(/^[\s]*[-*]\s*/, '').trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=20`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return NextResponse.json({ entries: [] }, { status: 200 });
    }

    const releases: GitHubRelease[] = await res.json();

    const entries: ChangelogEntry[] = releases.map((release) => ({
      version: (release.tag_name || '').replace(/^v/, ''),
      date: release.published_at ? release.published_at.split('T')[0] : '',
      title: release.name || `v${(release.tag_name || '').replace(/^v/, '')}`,
      type: release.prerelease ? 'beta' : 'release',
      changes: parseChanges(release.body),
    }));

    return NextResponse.json({ entries });
  } catch {
    return NextResponse.json({ entries: [] }, { status: 200 });
  }
}
