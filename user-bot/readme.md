# Gibwork Github Tips

# todo

## Description

# todo

## Prerequisites

- Node.js
- Yarn

## Installation

1. Clone the repository: `git clone git@github.com:gibwork/gibwork-github-tips.git`
2. Navigate to the project directory: `cd gibwork-github-tips/user-bot`
3. Install the dependencies with `yarn install`
4. Copy the `.env.example` file to `.env` and fill in the required values

## Running the Project

### Development

To run the project in development mode, use the following command:

```bash
yarn dev
```

### Production

To run the project in production mode, use the following command:

```bash
yarn build
yarn start
```


## Github Dependency

The GitHub API imposes a default rate limit of 5000 requests per hour. If the bot 
is set to check notifications every 5 seconds (the default delay), it will operate 
well within this limit. However, setting the delay too short could result in 
exceeding the rate limit.
