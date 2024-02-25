# Gibwork Github Tips

## Getting Started

Follow these steps to clone the repository and start the development server:

- `git clone git@github.com:gibwork/gibwork-github-tips.git`
- `cd gibwork-github-tips`
- `yarn install`
- Create a `.env.local` file by copying the example environment file:
- Add the required environment variables to the `.env.local` file.

## Running the Project

### Development

To run the project in development mode, use the following command:

#### *User Bot* 
```bash
yarn dev:user-bot
```

#### *Github App* 

 ```bash
yarn build

yarn start:github-app
```

### Production

To run the project in production mode, use the following command:

```bash
yarn build
# user-bot
yarn start:user-bot
# github-app
yarn start:github-app
```


## Github Dependency

The GitHub API imposes a default rate limit of 5000 requests per hour. If the bot 
is set to check notifications every 5 seconds (the default delay), it will operate 
well within this limit. However, setting the delay too short could result in 
exceeding the rate limit.

## Contributing

If you have suggestions for how gibworkbot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).
