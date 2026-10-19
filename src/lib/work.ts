import { getCollection, type CollectionEntry } from 'astro:content';

export type WorkEntry = CollectionEntry<'work'>;

/** All published case studies, in display order. */
export async function getWork(): Promise<WorkEntry[]> {
  const entries = await getCollection('work', ({ data }) => !data.draft);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedWork(limit = 3): Promise<WorkEntry[]> {
  return (await getWork()).filter((entry) => entry.data.featured).slice(0, limit);
}

/** Case studies by id, keeping the order of `ids` and skipping unknown ones. */
export async function getWorkByIds(ids: string[]): Promise<WorkEntry[]> {
  const all = await getWork();
  return ids.flatMap((id) => all.find((entry) => entry.id === id) ?? []);
}
