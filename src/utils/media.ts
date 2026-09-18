/**
 * Resolves media URLs for photos and videos.
 * Uses local bundled high-performance assets directly for instant, zero-lag loading without network timeouts.
 */
export function getMediaUrl(mediaKey: string): string {
  if (!mediaKey) return '';
  if (mediaKey.startsWith('http://') || mediaKey.startsWith('https://')) {
    return mediaKey;
  }
  return `/media/${mediaKey}`;
}

export function getLocalFallbackMediaUrl(mediaKey: string): string {
  if (!mediaKey) return '';
  return `/media/${mediaKey}`;
}

