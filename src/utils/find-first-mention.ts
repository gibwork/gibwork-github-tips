export function findFirstMentionAndCommandReverse(arr) {
  // Regex to match "@username tip amount @recipient" pattern
  const commandRegex = /@(\w+)\s+tip\s+(\d+)\s+@(\w+)/;

  for (let i = arr.length - 1; i >= 0; i--) {
    try {
      const item = arr[i];
      // Check if the item's body contains the specific command pattern
      if (item.body && commandRegex.test(item.body)) {
        const matches = item.body.match(commandRegex);
        if (matches) {
          // Extract command details
          const botUsername = matches[1];
          const tipAmount = matches[2];
          const recipientUsername = matches[3];
          // Return the item along with extracted command details
          return {
            item,
            commandDetails: {
              botUsername,
              tipAmount,
              recipientUsername
            }
          };
        }
      }
    } catch (e) {
      console.error('Error', e);
    }
  }

  return null;
}
