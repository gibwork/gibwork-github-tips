# gibworkbot

> A GitHub App built with [Probot](https://github.com/probot/probot) that A GitHub App for GIBWORK tips and bounty&#x27;s.

## Prerequisites

- Node.js
- Yarn

## Installation

1. Clone the repository: `git clone git@github.com:gibwork/gibwork-github-tips.git`
2. Navigate to the project directory: `cd gibwork-github-tips/github-app`
3. Install the dependencies with `yarn install` or `npm install`
4. Copy the `.env.example` file to `.env` and fill in the required values


```sh
# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t gibworkbot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> gibworkbot
```

## Contributing

If you have suggestions for how gibworkbot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](../CONTRIBUTING.md).
