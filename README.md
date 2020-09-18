# groupie
Usergroup and keyword ping manager for Discord

## Deploy
1. `touch .env` at the project root and define these:
```
DISCORD_BOT_TOKEN=
DISCORD_CHANNELID_COMMANDS=
DISCORD_COMMAND_PREFIX=
USERGROUP_NAME_PREFIX=
```
2. Run:
```
yarn install
yarn build
yarn deploy
```
