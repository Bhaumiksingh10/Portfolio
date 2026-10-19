/** Split "I build *backends*, and more" into plain and highlighted parts (text between asterisks is highlighted). */
export function markSegments(text: string): { text: string; mark: boolean }[] {
  return text
    .split('*')
    .map((part, index) => ({ text: part, mark: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}

/** "Dec 2026" for planned drives, "13 Dec 2026" once done. */
export function formatDriveDate(date: Date, planned: boolean): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: planned ? undefined : 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}
