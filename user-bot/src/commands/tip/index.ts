import * as gibworkService from '../../../../shared/services/gibwork.service';
import * as githubService from '../../../../shared/services/github.service';

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

  const contributors = await githubService.getContributors(repository, owner);
  const collaborators = await githubService.getCollaborators(repository, owner);

  if (
    !contributors.find((user: any) => user.login === fromGithubUser) &&
    !collaborators.find((user: any) => user.login === fromGithubUser)
  ) {
    await githubService.answerPullRequest(
      pullId,
      repository,
      owner,
      `Make sure you are a contributor to this repository.`,
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

  if (!url) {
    return;
  }

  await githubService.answerPullRequest(pullId, repository, owner, url.message);
  await githubService.setNotificationRead(notificationId);
}
