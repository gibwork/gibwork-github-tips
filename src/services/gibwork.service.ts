interface GibWorkTip {
  owner: string;
  repository: string;
  commentId: number;
  fromGithubUser: string;
  toGithubUser: string;
  message: string;
  tip: {
    token: string;
    amount: number;
  };
}

interface GibWorkTipResponse {
  tipHtmlUrl: string;
  message: string;
}

export async function tip(data: GibWorkTip): Promise<GibWorkTipResponse> {
  const response = await fetch(`${process.env.GIBWORK_API}/tip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const gibdata = await response.json();

  return gibdata as GibWorkTipResponse;
}
