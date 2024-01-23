import dotenv from 'dotenv';
dotenv.config();

const token = process.env.GITHUB_TOKEN

export interface Notification {
  id: string;
  message: string;
  repo: string;
  pullId: string;
  userId: string;
}

export async function getNotifications() {
  const response = await fetch('https://api.github.com/notifications', { headers: { Authorization: `Bearer ${token}` } });
  const notifications: any = await response.json();

  const notMentions = notifications.filter((notification: any) => notification.reason !== 'mention');

  for (const notification of notMentions) {
    await setNotificationRead(notification.id);
  }

  const mentions = notifications.filter((notification: any) => notification.reason === 'mention');

  const notification: Notification[] = [];

  for(const mention of mentions) {
    const response = await fetch(mention.subject.latest_comment_url, { headers: { Authorization: `Bearer ${token}` } });
    const data: any = await response.json();

    notification.push({
      id: mention.id,
      message: data.body,
      userId: data.user.id,
      pullId: mention.subject.url.split('/').pop(),
      repo: mention.repository.full_name
    })
  }

  return notification;
}


export async function setNotificationRead(notificationId: string) {
  await fetch(`https://api.github.com/notifications/threads/${notificationId}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
}

export async function answerPullRequest(pullId: string, repo: string, message: string) {
  await fetch(`https://api.github.com/repos/${repo}/issues/${pullId}/comments`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify({ body: message }) });
}

export async function getUserInfo(username: string): Promise<any> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  return await response.json();
}
