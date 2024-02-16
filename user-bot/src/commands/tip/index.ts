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

  // const contributors = await githubService.getContributors(repository, owner);
  // if (!contributors.find((user: any) => user.login === fromGithubUser)) {
  //   await githubService.answerPullRequest(
  //     pullId,
  //     repository,
  //     owner,
  //     `Make sure you are a contributor to this repository.`,
  //   );
  //   await githubService.setNotificationRead(notificationId);

  //   return;
  // }

  const collaborators = await githubService.getCollaborators(repository, owner);
  if (!collaborators.find((user: any) => user.login === toGithubUser)) {
    await githubService.answerPullRequest(
      pullId,
      repository,
      owner,
      `Make sure the user you are tipping is a collaborator to this repository.`,
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
    throw new Error('Error tipping user');
  } else {
    await githubService.answerPullRequest(
      pullId,
      repository,
      owner,
      url.message,
    );
    await githubService.setNotificationRead(notificationId);
  }
}
