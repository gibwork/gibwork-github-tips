import { getNotifications } from './services/github.service';
import { parseCommand } from "./utils/parse-command";
import { COMMANDS } from "./config";
import { TipValidationSchema } from "./commands/tip/validation";
import { tipCommand } from "./commands/tip";

export async function run() {
  const notifications = await getNotifications();

  for (const notification of notifications) {
    const command = parseCommand(notification.message);

    switch (command.command) {
      case COMMANDS.TIP:
        try {
          const value = command.args[0];
          const user = command.args[1].replace('@', '');

          const payload = TipValidationSchema.parse({ value })
          await tipCommand({
            username: user,
            notificationId: notification.id,
            value: payload.value,
            repo: notification.repo,
            pullId: notification.pullId,
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
