import dotenv from 'dotenv';
dotenv.config();

import cron from 'node-cron';
import { run } from './app';
import { millisecondsToExtendedCron } from './utils/millisecond-to-cron';

console.log('Started');

const cronExpression = millisecondsToExtendedCron(
  Number(process.env.DELAY_VERIFICATION || 5000),
);

cron.schedule(cronExpression, async () => {
  try {
    await run();
  } catch (error) {
    console.log('Error running cron job');
    console.log(error);
  }
});
