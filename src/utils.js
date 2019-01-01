export const fn = {
  replace: (arr, item, itemId) => [
    ...arr.slice(0, itemId),
    item,
    ...arr.slice(itemId + 1, arr.length)
  ],
  remove: (arr, itemId) => [
    ...arr.slice(0, itemId),
    ...arr.slice(itemId + 1, arr.length)
  ],
  push: (arr, item) => [...arr, item],
}