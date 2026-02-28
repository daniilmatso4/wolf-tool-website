import { NextResponse } from 'next/server';

const GITHUB_REPO = 'daniilmatso4/wolf-tool';

// Fallback values if GitHub API fails
const FALLBACK_VERSION = '1.0.0';
const FALLBACK_TAG = 'v1.0.1';
const FALLBACK_URLS = {
  windows: `https://github.com/${GITHUB_REPO}/releases/download/${FALLBACK_TAG}/Wolf.Tool.Setup.${FALLBACK_VERSION}.exe`,
  mac: `https://github.com/${GITHUB_REPO}/releases/download/${FALLBACK_TAG}/Wolf.Tool-${FALLBACK_VERSION}-universal.dmg`,
};

async function getLatestRelease() {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) return null;

  const release = await res.json();
  const assets: { name: string; browser_download_url: string }[] = release.assets || [];

  const exeAsset = assets.find((a) => a.name.endsWith('.exe'));
  const dmgAsset = assets.find((a) => a.name.endsWith('.dmg'));

  // Extract version from tag (e.g. "v1.2.3" -> "1.2.3")
  const version = (release.tag_name || '').replace(/^v/, '') || FALLBACK_VERSION;

  return {
    version,
    releaseName: release.name || `v${version}`,
    publishedAt: release.published_at,
    urls: {
      windows: exeAsset?.browser_download_url || FALLBACK_URLS.windows,
      mac: dmgAsset?.browser_download_url || FALLBACK_URLS.mac,
    },
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = (searchParams.get('platform') || 'windows') as 'windows' | 'mac';

  try {
    const release = await getLatestRelease();

    if (release) {
      return NextResponse.json({
        url: release.urls[platform] || release.urls.windows,
        version: release.version,
        releaseName: release.releaseName,
        publishedAt: release.publishedAt,
      });
    }
  } catch {
    // Fall through to fallback
  }

  return NextResponse.json({
    url: FALLBACK_URLS[platform] || FALLBACK_URLS.windows,
    version: FALLBACK_VERSION,
  });
}
