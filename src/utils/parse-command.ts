export interface Commands {
  prefix: string;
  command: string;
  args: string[];
}

export function parseCommand(message: string): Commands {
  const [prefix, command, ...args] = message.split(' ');

  return {
    prefix,
    command,
    args,
  };
}
