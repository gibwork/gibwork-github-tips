import { tip } from '../../../shared/services/gibwork.service';

export interface TipCommand {
  issueId?: number;
  toGithubUser?: string;
  fromGithubUser: string;
  amount: number;
  repository: string;
  owner: string;
  commentId: number;
  pullId?: number;
  message: string;
}

export async function tipCommand({
  issueId,
  commentId,
  amount,
  pullId,
  owner,
  repository,
  toGithubUser,
  fromGithubUser,
  message,
}: TipCommand) {
  console.log('toGithubUser', toGithubUser);
  console.log('fromGithubUser', fromGithubUser);
  if (!toGithubUser) {
    console.error('Invalid input: user not found');
    console.log('issuesID,pullID', issueId, pullId);

    return { tipHtmlUrl: '', message: 'Invalid input: user not found' };
  }

  const url = await tip({
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

  return url;
}
