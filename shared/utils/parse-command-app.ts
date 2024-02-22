export interface Commands {
  prefix: string;
  args: string[];
}

export function parseCommand(message: string): Commands {
  // Split the message by spaces
  const [prefix, ...args] = message.split(' ');

  console.log('prefix', prefix);

  // Check if the prefix starts with '@' and the command is 'tip'
  if (prefix.toLowerCase() === '/tip') {
    // Extract the username to be tipped
    const tipRecipient = args.find((arg) => arg.startsWith('@')) as string;
    const tipIndex = args.indexOf(tipRecipient);

    // Extract the amount to be tipped
    const tipAmount = args[tipIndex - 1];

    // Construct the new args array with only the necessary elements
    const newArgs = [tipRecipient, tipAmount];

    return {
      prefix,
      args: newArgs,
    };
  }

  // Return the parsed command as is for other commands
  return {
    prefix,
    args,
  };
}
