export const sortNewToOld = (a, b) => new Date(a) - new Date(b);
export const sortOldToNew = (a, b) => new Date(b) - new Date(a);

export const sort1toN = (a, b) => (a || Infinity) - (b || Infinity);
export const sortNto1 = (a, b) => (b || Infinity) - (a || Infinity);

export function sortWithProperty({ order, property } = { order: 'asc' }, fn) {
  if (!property) {
    throw new Error('Please provide a {property} value');
  }
  if (order === 'desc') {
    return fn
      ? fn
      : (a, b) => (b[property] || Infinity) - (a[property] || Infinity);
  }
  return fn
    ? fn
    : (a, b) => (a[property] || Infinity) - (b[property] || Infinity);
}

export function sortWithDate(
  { order, property } = { order: 'asc', property: 'updatedAt' }
) {
  if (!property) {
    throw new Error('Please provide a {property} value');
  }
  if (order === 'desc') {
    return (a, b) => {
      return new Date(b[property]) - new Date(a[property]);
    };
  }
  return (a, b) => new Date(a[property]) - new Date(b[property]);
}
