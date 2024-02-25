import { Probot } from 'probot';

import { parseCommand } from '../../shared/utils/parse-command-app';
import { TipValidationSchema } from '../../shared/utils/tip-amount-validation';
import { tipCommand } from './services/gibwork.service';

export = (app: Probot) => {
  app.on(['issue_comment.created'], async (context) => {
    if (context.payload.comment.user.type === 'Bot') {
      return context.log.info('Comment created by bot, no action required...');
    }

    if (
      ['OWNER', 'CONTRIBUTOR', 'COLLABORATOR', 'MEMBER'].includes(
        context.payload.comment.author_association,
      )
    ) {
      context.log.info(
        `Comment created by ${context.payload.issue.author_association}`,
      );

      const command = parseCommand(context.payload.comment.body);
      console.log(command);
      if (command.args[0] === undefined) return; // User not referenced properly, hence parsedCommand returns "undefined" args
      if (command.prefix === '/tip') {
        const user = command.args[0]?.replace('@', '');
        const amount = Number(command.args[1]);

        const payload = TipValidationSchema.parse({ amount });
        const returnStatement = await tipCommand({
          issueId: context.payload.issue.id,
          commentId: context.payload.comment.id,
          amount: payload.amount,
          owner: context.payload.repository.owner.login,
          repository: context.payload.repository.name,
          fromGithubUser: context.payload.comment.user.login,
          toGithubUser: user,
          message: 'You have been tipped!',
        });

        if (!returnStatement) {
          return;
        }

        const issueComment = context.issue({
          body: returnStatement.message,
        });
        await context.octokit.issues.createComment(issueComment);
        return;
      }
    }
  });
};
