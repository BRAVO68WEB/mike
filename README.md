
# Mike

[![Dbl](https://discordbots.org/api/widget/upvotes/419620594645073930.svg)](https://discordbots.org/bot/419620594645073930)
[![Server](https://img.shields.io/discord/340947847728070666.svg?logo=discord&colorB=7289DA)](https://discord.gg/ZwPfRfp)
[![Github contributors](https://img.shields.io/github/contributors/mike-boat/mike.svg)](https://github.com/mike-boat/mike/contributors)
[![GitHub issues](https://img.shields.io/github/issues/mike-boat/mike.svg)](https://github.com/mike-boat/mike/issues)
[![GitHub forks](https://img.shields.io/github/forks/mike-boat/mike.svg)](https://github.com/mike-boat/mike/network)
[![GitHub stars](https://img.shields.io/github/stars/mike-boat/mike.svg)](https://github.com/mike-boat/mikestargazers)
[![GitHub license](https://img.shields.io/github/license/mike-boat/mike.svg)](https://github.com/mike-boat/mike/blob/master/LICENSE)

---
Mike is a customizable Discord bot with a lot of plugins:
* Logs
* Music
* Economy
* Leveling
* Starboard
* Moderation
* Suggestions
* Chat Filters
* Custom Commands
* Welcome Message
* Image Generation
* Twitch, Reddit Notifications

---
### Contributing

If you want to contribute to Mike, [join support
server](https://discord.gg/ZwPfRfp).

---
### Links

[Invite](https://discordapp.com/oauth2/authorize?client_id=419620594645073930&permissions=8&scope=bot)

[Website](https://mikebot.xyz)

[Discord Bot List](https://discordbots.org/bot/419620594645073930)

---
### Contributors

Thanks goes to these wonderful people :

<table>
	<tr>
		<td align="center">
			<a href="https://github.com/juby210-PL">
				<img src="https://avatars0.githubusercontent.com/u/48866434?s=460&v=4" width="100px;" alt="Juby210"/>
				<br />
				<sub>
					<b>Juby210</b>
				</sub>
			</a><br />
			<a href="#" title="Code">💻</a>
		</td>
		<td align="center">
			<a href="https://github.com/Nimplex">
				<img src="https://avatars2.githubusercontent.com/u/39964594?s=400&v=4" width="100px;" alt="Nimplex"/>
				<br />
				<sub>
					<b>Nimplex</b>
				</sub>
			</a><br />
			<a href="#" title="Code">💻</a>
		</td>
		<td align="center">
			<a href="https://github.com/RamiLego4Game">
				<img src="https://avatars3.githubusercontent.com/u/6272475?s=460&v=4" width="100px;" alt="RamiLego4Game"/>
				<br />
				<sub>
					<b>Rami Sabbagh</b>
				</sub>
			</a><br />
			<a href="#" title="Code">💻</a>
			<a href="#" title="Bug">🐛</a>
			<a href="#" title="Tutorial">✅</a>
		</td>
		<td align="center">
			<a href="https://github.com/Maanex/">
				<img src="https://avatars3.githubusercontent.com/u/23345879?s=460&v=4" width="100px;" alt="Maanex"/>
				<br />
				<sub>
					<b>Maanex</b>
				</sub>
			</a><br />
			<a href="#" title="Code">💻</a>
			<a href="#" title="Bug">🐛</a>
		</td>
</table>

---
### Mike uses

- [RethinkDB](https://www.rethinkdb.com/)
- [Lavalink](https://github.com/Frederikam/Lavalink)
- [Notif Worker](https://github.com/mike-boat/notif-worker)
- Milkscript (soon)

and many more...

---
#### Self-hosting

It is not recommended to self-host Mike due to the fact that a lot 3rd party APIs and programs are being used.
It simply would be too difficult.

But if you still want to do that, here's the instructions for hosting Mike **locally**:

##### 1. Setting up the repository:
1. Clone the repository into a local directory.
2. Open a command prompt inside the repositroy directory.
3. Execute `npm install`

##### 2. Setting up RethinkDB:

###### Windows:

1. Create `rethinkdb` directory in the cloned repository.
2. Download rethinkdb from https://rethinkdb.com/docs/install/windows/
3. Extract the downloaded .zip file, and copy `rethinkdb.exe` into the directory created earlier in step 1.
4. Run `rethinkdb.exe` either from a command prompt or by double clicking it.
5. Open http://127.0.0.1:8080/#tables in your favourite web browser.
6. Inside, the `test` database (or one specified in the configuration), click `+ Add Table` to add 2 new tables: `guilds` and `users`.
7. Close rethinkdb, or keep it running for starting Mike later.

###### Ubuntu:

1. Create `rethinkdb` directory in the cloned repository.
2. Install rethinkdb by following instructions at https://rethinkdb.com/docs/install/ubuntu/
3. Open a terminal in the `rethinkdb` directory created earlier, and execute `rethinkdb`
5. Open http://127.0.0.1:8080/#tables in your favourite web browser.
6. Inside, the `test` database (or one specified in the configuration), click `+ Add Table` to add 2 new tables: `guilds` and `users`.
7. Terminate rethinkdb, or keep it running for starting Mike later.

##### 3. Setting up Lavalink:

1. Make sure you have java jre installed in your system.
2. Download `Lavalink.jar` from https://github.com/Frederikam/Lavalink/releases and place it into the the cloned repository folder.
3. Create `application.yml` in the same folder of `Lavalink.jar`
4. Use this template for `application.yml` https://github.com/Frederikam/Lavalink/blob/master/LavalinkServer/application.yml.example
5. Make sure to set the address into `127.0.0.1` if hosting locally.
6. Change `password` into something different, and write down for usage later in the setup instructions.
7. Change the logging path from `./logs/` into somewhere outside the cloned repository folder.
8. Run Lavalink with `java -jar Lavalink.jar` for starting Mike later.

##### 4. Create mike's missing configuration files:

> Those configuration files contain secrets and passwords, and so they are .gitignored by default, make sure to not post those secrets into the public!

1. Browse into `files` directory inside the cloned repository folder.
2. Create `databases.json` with this data:
```json
{
    "main": {},
    "beta": {}
}
```

3. Create `dashboards.json` with this data: (Replace `YOUR_DISCORD_BOT_SECRET` with the your bot's secret from [Discord Developer Dashboard](https://discordapp.com/developers/applications/))
```json
{
    "beta": {
        "https": false,
        "domain": "127.0.0.1",
        "port":"8081",
        "secret": "YOUR_DISCORD_BOT_SECRET"
    },

    "use": [
	"ID",
	"ID"
    ]
}
```

4. Create `roles.json` with this data: (Replace `YOUR_DISCORD_USER_ID` with your discord user id, which you can figure out by enabling `Developer Mode` then rightclicking yourself and pressing `Copy ID`)
```json
{
  "developers":["YOUR_DISCORD_USER_ID"],
  "contributors":["214858075650260992","324622488644616195", "364056796932997121"]
}
```

5. Create `lavalink.json` with this data: (Replace `YOUR_LAVALINK PASSWORD` with the password you've entered into `application.yml`)
```json
{
    "host": "127.0.0.1",
    "port": "2333",
    "password": "YOUR_LAVALINK_PASSWORD"
}
```

##### 5. Gathering Required API tokens:

Create `tokens.json` in the `files` directory (in the cloned repository folder) and fill it with this template data:
```json
{
    "main": "DISCORD_TOKEN_FOR_MIKE_MAIN",
    "beta": "DISCORD_TOKEN_FOR_MIKE_BETA",
	
    "spotifyID": "SPOTIFY_ID",
    "spotifySecret": "SPOTIFY_SECRET",

    "dblist": "DISCORDBOTS.ORG_API_TOKEN",
    "badosz": "BADOSZ_API_TOKEN",
    "genius": "GENIUS_API_TOKEN",
    "twitch": "TWITCH_API_TOKEN",
    "fortnite": "FORTNITE_API_TOKEN",
    "osu": "OSU_API_TOKEN"
}
```

###### Discord Bot Token:
1. Open the [Discord Developer Dashboard](https://discordapp.com/developers/applications/).
2. Press `New Application`.
3. On the left panel, press the `Bot` tab.
4. On the right, press the `Add Bot` button.
5. Press the `Copy` button.
6. Replace `DISCORD_TOKEN_FOR_MIKE_BETA` in `tokens.json` with the copied token.
7. Back into the website, in the left panel, press the `OAuth2` tab.
8. Scroll down, and check the `bot` box, then the `Adminstrator` box.
9. Copy the generated url, and use it for inviting the bot into your discord server.
10. Also send the url to Badosz#0001, and kindly ask him to add the created bot into the Mikemojis server (Required for mike emojies to work).

###### Spotify Client Token:
1. Open the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2. Login (Create an account if you don't have one).
3. Press `Create a client ID`.
4. Fill in the information.
5. Once the creation is done, copy the displayed client ID, and replace `SPOTIFY_ID` in `tokens.json` with it.
6. Press `Show client secret`, and copy it, then replace `SPOTIFY_SECRET` in `tokens.json` with it.

##### 6. Start the local bot:
1. Open a command prompt in the cloned repository directory.
2. Execute `node mike.js beta`
3. Enjoy!

##### 7. Adding Extra Tokens:

###### Badosz:
> Used to power the images commands!
1. Join https://discord.gg/DfqHd6U
2. Ask Badosz kindly for an API key.
3. Replace `BADOSZ_API_TOKEN` with the provided API key.

###### Genius.com:
> Used for fetching music's lyrics!

1. Open the [Genius Developer Dashboard](https://genius.com/developers).
2. Press `Create an API client`.
3. Login or register.
4. Fill in the information.
5. Press `Generate access token`
6. Copy the access token, and replace `GENIUS_API_TOKEN` with it.

##### Twitch:
1. Open the [Twitch Developer Console](https://dev.twitch.tv/console).
2. Login or Register.
3. Enable 2FA on your account, that's required for managing applications.
4. Back into the [Twitch Developer Console](https://dev.twitch.tv/console), Press the `Applications` tab.
5. Press `Register Your Application` button.
6. Fill in the information.
7. Press manage on the created application.
8. Copy the Client ID, and replace `TWITCH_API_TOKEN` with it.

##### Fortnite API (Not the game):
1. Open https://fortniteapi.com/
2. Sign in or Register.
> For some reason the contributer can't register into the website at the time of writing this section and so the instructions can't be continued :(

###### OSU:
1. Open https://osu.ppy.sh/forum/ucp.php?mode=login
2. Login or Register.
> The contributer writing those instructions didn't want to install the OSU! client to continue his registration, so it's open for someone else to continue writing this section.

###### DiscordBots.org:
> For a local hosted development bot, you don't want to register it into DiscordBots.org, and those instructions are for local hosting only, so the DiscordBots.org token won't be included.

<!-- ## License -->
