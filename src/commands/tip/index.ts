import * as gibworkService from '../../services/gibwork.service';
import * as githubService from '../../services/github.service';

export interface TipCommand {
  notificationId: string;
  toGithubUser?: string;
  fromGithubUser: string;
  amount: number;
  repository: string;
  owner: string;
  commentId: number;
  pullId: string;
  message: string;
}

export async function tipCommand({
  notificationId,
  commentId,
  amount,
  pullId,
  owner,
  repository,
  toGithubUser,
  fromGithubUser,
  message,
}: TipCommand) {
  if (!toGithubUser) {
    console.error('Invalid input: user not found');
    await githubService.answerPullRequest(
      pullId,
      repository,
      owner,
      `Please, specify a user to tip.`,
    );
    await githubService.setNotificationRead(notificationId);

    return;
  }

  const url = await gibworkService.tip({
    toGithubUser,
    fromGithubUser,
    message,
    commentId,
    repository,
    owner,
    tip: {
      token: 'USDC',
      amount: amount,
    },
  });

  await githubService.answerPullRequest(pullId, repository, owner, url.message);
  await githubService.setNotificationRead(notificationId);
}
