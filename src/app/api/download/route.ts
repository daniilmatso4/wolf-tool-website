import { NextResponse } from 'next/server';

const GITHUB_REPO = 'daniilmatso4/wolf-tool';
const TAG = 'v1.0.1';
const FILE_VERSION = '1.0.0';

const DOWNLOAD_URLS = {
  windows: `https://github.com/${GITHUB_REPO}/releases/download/${TAG}/Wolf.Tool.Setup.${FILE_VERSION}.exe`,
  mac: `https://github.com/${GITHUB_REPO}/releases/download/${TAG}/Wolf.Tool-${FILE_VERSION}-universal.dmg`,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform') || 'windows';

  const url = DOWNLOAD_URLS[platform as keyof typeof DOWNLOAD_URLS] || DOWNLOAD_URLS.windows;

  return NextResponse.json({ url, version: FILE_VERSION });
}
