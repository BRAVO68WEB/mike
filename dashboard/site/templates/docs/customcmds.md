#  Custom Commands

In Custom Commands you can use special tags:

Tag | Example Output
:-------- | ---
**{user.name}** | `Badosz`
**{user.mention}** | `@Badosz#0001`
**{user.tag}** | `0001`
**{user.id}** | `214858075650260992`
**{server.name}** | `Test Server`
**{server.members}** | `42`
**{server.bots}** | `10`
**{server.id}** | `340947847728070666`
**{server.bots}** | `10`
**{channel.name}** | `general`
**{channel.mention}** | `#general`
**{channel.id}** | `518783985699258389`
**{option 1 \| option 2}** | `option 1`

There are few special tags too:

Tag | Function | Example
:-------- | ------- | ---
**{noeveryone}** | `Removes @everyone from command.` | `Hi @everyone {noeveryone}`
**{option 1 \| option 2}** | `Returns random output.` | `You are so {good\|bad}!`
**{delete}** | `Deletes command trigger.` | `Someone summoned me? {delete}`


### Custom command Example
`Hi {user.name}, Here's random number: {1|2|3|4|5|6}`
