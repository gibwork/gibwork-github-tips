import { getNotifications } from '../../shared/services/github.service';
import { tipCommand } from './commands/tip';
import { TipValidationSchema } from '../../shared/utils/tip-amount-validation';
import { parseCommand } from '../../shared/utils/parse-command-bot';
import { COMMANDS } from '../../shared/config';

export async function run() {
  const notifications = await getNotifications();

  if (notifications.length > 0)
    console.log(`Found ${notifications.length} notifications`);

  for (const notification of notifications) {
    const command = parseCommand(notification.message);

    switch (command.command) {
      case COMMANDS.TIP:
        try {
          const amount = command.args[0];
          const user = command.args[1]?.replace('@', '');

          const payload = TipValidationSchema.parse({ amount });
          await tipCommand({
            fromGithubUser: notification.username,
            toGithubUser: user,
            notificationId: notification.id,
            amount: payload.amount,
            repository: notification.repository,
            owner: notification.owner,
            pullId: notification.pullId,
            message: notification.message,
            commentId: notification.commentId,
          });
        } catch (error) {
          console.error(`Invalid input: ${error}`);
        }
        break;
      default:
        break;
    }
  }
}
