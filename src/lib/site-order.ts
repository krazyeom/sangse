export function getSiteBaseName(siteName: string): string {
  return siteName.replace(/\s*\(([^()]+)\)\s*$/, '');
}

export function getSiteRegion(siteName: string): string | null {
  const match = siteName.match(/\(([^()]+)\)\s*$/);
  return match ? match[1] : null;
}

export function hasSiteRegion(siteName: string): boolean {
  return getSiteRegion(siteName) !== null;
}
