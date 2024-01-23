import * as gibworkService from '../../services/gibwork.service';
import * as githubService from '../../services/github.service';

export interface TipCommand {
  notificationId: string;
  username: string;
  value: number;
  repo: string;
  pullId: string;
}

export async function tipCommand({ notificationId, value, pullId, repo, username }: TipCommand) {
  const user = await githubService.getUserInfo(username);
  const url = await gibworkService.callApi();

  await githubService.answerPullRequest(pullId, repo, `Tip ${value} GIB to userId ${user.id} - GibWork URL ${url}`);
  await githubService.setNotificationRead(notificationId)
}
