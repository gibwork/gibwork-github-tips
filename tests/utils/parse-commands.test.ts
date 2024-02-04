import { parseCommand } from '../../src/utils/parse-command';

const prefix = process.env.COMMAND_PREFIX;

describe('parse command', () => {
  test('Should be able to find command and args in message', () => {
    const message = `${prefix} tip 100 @user`;

    const result = parseCommand(message);

    expect(result).toEqual({
      prefix,
      command: 'tip',
      args: ['100', '@user'],
    });
  });

  test('Should be able to find command even not start with prefix', () => {
    const message = `I'm tipping a test, ${prefix} tip 100 @user`;

    const result = parseCommand(message);

    expect(result).toEqual({
      prefix,
      command: 'tip',
      args: ['100', '@user'],
    });
  });

  test('Should return null values if message not contains command', () => {
    const message = 'testing message';

    const result = parseCommand(message);

    expect(result).toEqual({
      prefix: '',
      command: '',
      args: [],
    });
  });
});
