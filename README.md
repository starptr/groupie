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

## Features
- `ping` to ping a usergroup
- `make` to make a usergroup
- `join` to join a usergroup
- `leave` to leave a usergroup
- `cleanup` to delete empty usergroups
- Support for `./src/blacklist.json`