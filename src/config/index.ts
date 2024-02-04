import dotenv from 'dotenv';
dotenv.config();

if (!process.env.COMMAND_PREFIX)
  throw new Error('COMMAND_PREFIX is not defined');

export const COMMAND_PREFIX = String(process.env.COMMAND_PREFIX);
export const COMMANDS = {
  TIP: 'tip',
};
