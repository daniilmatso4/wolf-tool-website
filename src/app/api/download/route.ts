import { NextResponse } from 'next/server';

const GITHUB_REPO = 'daniilmatso4/wolf-tool';
const VERSION = '1.0.0';

const DOWNLOAD_URLS = {
  windows: `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}/Wolf.Tool.Setup.${VERSION}.exe`,
  mac: `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}/Wolf.Tool-${VERSION}.dmg`,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform') || 'windows';

  const url = DOWNLOAD_URLS[platform as keyof typeof DOWNLOAD_URLS] || DOWNLOAD_URLS.windows;

  return NextResponse.json({ url, version: VERSION });
}
