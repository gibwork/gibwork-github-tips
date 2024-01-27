import { findFirstMentionReverse } from '../utils/find-first-mention';

const token = process.env.GITHUB_TOKEN;

export interface Notification {
  id: string;
  commentId: number;
  message: string;
  repository: string;
  owner: string;
  pullId: string;
  username: string;
}

export async function getNotifications() {
  const response = await fetch('https://api.github.com/notifications', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const notifications: any = await response.json();

  const notMentions = notifications.filter(
    (notification: any) => notification.reason !== 'mention',
  );

  for (const notification of notMentions) {
    await setNotificationRead(notification.id);
  }

  const mentions = notifications.filter(
    (notification: any) => notification.reason === 'mention',
  );

  const notification: Notification[] = [];

  for (const mention of mentions) {
    const pullId = mention.subject.url.split('/').pop();
    const repository = mention.repository.full_name?.split('/')[1];
    const owner = mention.repository.full_name?.split('/')[0];

    const message = await getMessage(
      mention.subject.latest_comment_url,
      pullId,
      repository,
      owner,
    );

    notification.push({
      id: mention.id,
      commentId: message.id,
      message: message.body,
      username: message.user.login,
      pullId,
      repository,
      owner,
    });
  }

  return notification;
}

async function getMessage(
  latest_comment_url: string,
  pullId: string,
  repo: string,
  owner: string,
): Promise<any> {
  const response = await fetch(latest_comment_url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data: any = await response.json();

  if (!/@\w+/g.test(data.body)) {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${pullId}/comments?sort=created&direction=desc`,
      { method: 'GET', headers: { Authorization: `Bearer ${token}` } },
    );

    const linkHeader = response.headers
      .get('link')
      ?.split(',')
      .find((link: string) => link.includes('rel="last"'));

    const match = linkHeader?.match(/<(.+?)>/);
    if (match) {
      const url = match[1];
      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: any = await response.json();
      const message = findFirstMentionReverse(data);

      return message;
    } else {
      console.log('Link was not found');
    }
  }

  return data;
}

export async function setNotificationRead(notificationId: string) {
  await fetch(
    `https://api.github.com/notifications/threads/${notificationId}`,
    { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } },
  );
}

export async function answerPullRequest(
  pullId: string,
  repo: string,
  owner: string,
  message: string,
) {
  await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${pullId}/comments`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ body: message }),
    },
  );
}

export async function getContributors(repo: string, owner: string) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors`,
    { method: 'GET', headers: { Authorization: `Bearer ${token}` } },
  );
  const contributors: any = await response.json();

  return contributors;
}
