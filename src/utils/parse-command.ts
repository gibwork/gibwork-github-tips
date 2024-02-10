export interface Commands {
  prefix: string;
  command: string;
  args: string[];
}

export function parseCommand(message: string): Commands {
  // Split the message by spaces
  const [prefix, command, ...args] = message.split(' ');

  // Check if the prefix starts with '@' and the command is 'tip'
  if (prefix.startsWith('@') && command.toLowerCase() === 'tip') {
    // Extract the username to be tipped
    const tipRecipient = args.find(arg => arg.startsWith('@'));
    
    if (tipRecipient) { // Check if tipRecipient is defined
      const tipIndex = args.indexOf(tipRecipient);
      
      // Extract the amount to be tipped
      const tipAmount = args[tipIndex + 1];
      
      // Construct the new args array with only the necessary elements
      const newArgs = [tipRecipient, tipAmount];
      
      return {
        prefix,
        command,
        args: newArgs,
      };
    } else {
      throw new Error('Recipient not found in the tip command.');
    }
  }

  // Return the parsed command as is for other commands
  return {
    prefix,
    command,
    args,
  };
}
