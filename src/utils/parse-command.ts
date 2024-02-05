export function parseCommand(message: string): Commands {{
  const commandRegex = /(@gibworkbot tip) (\d+) (@\w+)/;
  const match = message.match(commandRegex);

  if (match) {{
    const [ , command, ...args ] = match;
    return {{
      prefix: '@gibworkbot',
      command,
      args,
    }};
  }}

  throw new Error('Command not found in message');
}}
