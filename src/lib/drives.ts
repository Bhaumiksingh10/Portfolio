import { getCollection, type CollectionEntry } from 'astro:content';

export type DriveEntry = CollectionEntry<'drives'>;

/** All drives, newest first (planned ones included). */
export async function getDrives(): Promise<DriveEntry[]> {
  const entries = await getCollection('drives', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Every photo from completed drives, newest drive first. */
export async function getDrivePhotos() {
  const drives = await getDrives();
  return drives
    .filter((drive) => drive.data.status === 'done')
    .flatMap((drive) => drive.data.photos.map((photo) => ({ ...photo, drive })));
}
