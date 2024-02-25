import { COMMAND_PREFIX } from '../config';

export interface Commands {
  prefix: string;
  command: string;
  args: string[];
}

export function parseCommand(message: string): Commands {
  if (message.includes(COMMAND_PREFIX)) {
    const start = message.indexOf(COMMAND_PREFIX) + COMMAND_PREFIX.length;
    const commandString = message.slice(start).trim();
    const [command, ...args] = commandString.split(/\s+/);

    return {
      prefix: COMMAND_PREFIX,
      command,
      args,
    };
  } else {
    return {
      prefix: '',
      command: '',
      args: [],
    };
  }
}
