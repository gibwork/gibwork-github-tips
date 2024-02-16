export function findFirstMentionReverse(arr: any[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    try {
      const item = arr[i];
      if (item.body && /@\w+/.test(item.body)) {
        return item;
      }
    } catch (e) {
      console.error('Error', e);
    }
  }

  return null;
}
