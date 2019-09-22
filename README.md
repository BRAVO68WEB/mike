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
			<a href="#" title="Code">💻 </a></td>
		</td>
		<td align="center">
			<a href="https://github.com/Nimplex">
				<img src="https://avatars2.githubusercontent.com/u/39964594?s=400&v=4" width="100px;" alt="Nimplex"/>
				<br />
				<sub>
					<b>Nimplex</b>
				</sub>
			</a><br />
			<a href="#" title="Code">💻 </a></td>
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

But if you still want to do that, here's the instructions:
> Please note that those instructions might be out of date!

##### 1. Setting up the repository
1. Clone the repository into a local directory.
2. Open a command prompt inside the repositroy directory.
3. Execute `npm install`

##### 2. Setting up RethinkDB

###### Windows:
1. Create `rethinkdb` directory in the cloned repository.
2. Download rethinkdb from https://rethinkdb.com/docs/install/windows/
3. Extract the downloaded .zip file, and copy `rethinkdb.exe` into the directory created earlier in step 1.
4. Run `rethinkdb.exe` either from a command prompt or by double clicking it.
5. Open http://127.0.0.1:8080/#tables in your favourite web browser.
6. Inside, the `test` database, click `+ Add Table` to add 2 new tables: `guilds` and `users`.
7. Close rethinkdb, or keep it running for starting mike later.

###### Ubuntu:

1. Create `rethinkdb` directory in the cloned repository.
2. Install rethinkdb by following instructions at https://rethinkdb.com/docs/install/ubuntu/
3. Open a terminal in the `rethinkdb` directory created earlier, and execute `rethinkdb`
5. Open http://127.0.0.1:8080/#tables in your favourite web browser.
6. Inside, the `test` database, click `+ Add Table` to add 2 new tables: `guilds` and `users`.
7. Terminate rethinkdb, or keep it running for starting mike later.

##### 3. Installing Lavalink

<!-- ## License -->
