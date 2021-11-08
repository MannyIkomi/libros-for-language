export function slugify(string) {
  return string.replace('_', '-').replace(' ', '-').toLowerCase();
}
