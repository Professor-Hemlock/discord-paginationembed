# Discord.JS - PaginationEmbed
A pagination utility for MessageEmbed in Discord.JS

[![Discord Server](https://discordapp.com/api/guilds/370614673122263041/embed.png)](https://discord.gg/eDUzT87)
[![Travis (.org) branch](https://img.shields.io/travis/gazmull/discord-paginationembed/master.svg?logo=travis&style=flat-square)](https://travis-ci.org/gazmull/discord-paginationembed)
[![npm peer dependency version](https://img.shields.io/npm/dependency-version/discord-paginationembed/peer/discord.js.svg?logo=npm&style=flat-square)](https://nodei.co/npm/discord-paginationembed/)
[![npm type definitions](https://img.shields.io/npm/types/discord-paginationembed.svg?logo=npm&style=flat-square)](https://nodei.co/npm/discord-paginationembed/)

[![NPM](https://nodei.co/npm/discord-paginationembed.png?downloads=true&stars=true)](https://nodei.co/npm/discord-paginationembed/)

## 📣 Notice Board
- [**Changelog**](https://github.com/gazmull/discord-paginationembed/blob/master/CHANGELOG.md)
- [**Updating from `v1`**](https://github.com/gazmull/discord-paginationembed/blob/master/UPDATING_V2.md)
- Recently updated to `v2`! If **[Documentation]** feels off, please clear site cache!
- This utility no longer provide updates for v1 (Discord.JS **11**)

## 🎉 Welcome
- ✔ **Typings** included
- ✔ **[Documentation]** for online references
- ✔ **Asynchronous** workflow
- ✔ Supports [Discord.JS **12**](https://discord.js.org "Go to Discord.JS Documentation")
- ❔ Nothing found within docs or need a nudge? You may visit the [**Discord server**](https://discord.gg/eDUzT87)

## 🛠 Installation
- **Requires Discord.JS 12**: `npm install discord.js`
- **PaginationEmbed**:
    - **Published**: `npm install discord-paginationembed@beta`
    - **Unpublished**: `npm install gazmull/discord-paginationembed`
      - ❗ Requires [**Git**](https://git-scm.com/)

## 🔰 Examples
> [**Test Unit Example**](https://github.com/gazmull/discord-paginationembed/blob/master/test)

> [**Preface for TypeScript Projects**](https://github.com/gazmull/discord-paginationembed/blob/master/UPDATING_V1.md#TypeScript)

### In-action samples:
- [**Pages of command description**](https://github.com/gazmull/eros-bot/blob/master/src/commands/general/guide.ts#L35)
- [**Toggle between character and its weapon, and toggle image visibility**](https://github.com/gazmull/eros-bot/blob/master/src/commands/kamihime/info.ts#L180)
- [**EXP Leaderboard**](https://github.com/gazmull/eros-bot/blob/master/src/commands/level/leaderboard.ts#L23)
- [**Music Queue**](https://github.com/gazmull/ramiel-bot/blob/master/src/commands/music/queue.ts#L38)

<br>

### ⚠ Warning
- Examples are written under `message` event!
- There are some methods not shown in the examples. If you want to know more methods to fiddle, please visit the **[Documentation]**

### `Embeds` Mode
- A pagination mode that uses an array of MessageEmbed to paginate.
- Usually used for complex builds such as characters' information.

```js
const Discord = require('discord.js');
const Pagination = require('discord-paginationembed');

const embeds = [];

for (let i = 1; i <= 5; ++i)
  embeds.push(new Discord.MessageEmbed().addField('Page', i));

const myImage = message.author.displayAvatarURL();

new Pagination.Embeds()
  .setArray(embeds)
  .setAuthorizedUsers([message.author.id])
  .setChannel(message.channel)
  .setPageIndicator(true)
  .setPage(3)
   // Methods below are for customising all embeds
  .setImage(myImage)
  .setThumbnail(myImage)
  .setTitle('Test Title')
  .setDescription('Test Description')
  .setFooter('Test Footer Text')
  .setURL(myImage)
  .setColor(0xFF00AE)
  .addField('\u200b', '\u200b')
  .addField('Test Field 1', 'Test Field 1', true)
  .addField('Test Field 2', 'Test Field 2', true)
  .build();
```
![Embeds](https://user-images.githubusercontent.com/32944712/37118454-41116cbe-228f-11e8-9878-f39db26316a1.png)

> This assumes this is under an `async` function

```js
const Discord = require('discord.js');
const Pagination = require('discord-paginationembed');

const embeds = [];

for (let i = 1; i <= 5; ++i)
  embeds.push(new Discord.MessageEmbed().addField('Page', i));

const Embeds = new PaginationEmbed.Embeds()
  .setArray(embeds)
  .setAuthorizedUsers([message.author.id])
  .setChannel(message.channel)
  .setPageIndicator(true)
  .setTitle('Test Title')
  .setDescription('Test Description')
  .setFooter('Test Footer Text')
  .setURL('https://gazmull.github.io/discord-paginationembed')
  .setColor(0xFF00AE)
  // Sets the client's assets to utilise. Available options:
  //  - message: the client's Message object (edits the message instead of sending new one for this instance)
  //  - prompt: custom content for the message sent when prompted to jump to a page
  //      {{user}} is the placeholder for the user mention
  .setClientAssets({ message, prompt: 'Page plz {{user}}' })
  .setDeleteOnTimeout(true)
  .setDisabledNavigationEmojis(['delete'])
  .setFunctionEmojis({
    '⬆': (_, instance) => {
      for (const embed of instance.array)
        embed.fields[0].value++;
    },
    '⬇': (_, instance) => {
      for (const embed of instance.array)
        embed.fields[0].value--;
    }
  })
  // Listeners for PaginationEmbed's events
  // After the initial embed has been sent
  // (technically, after the client finished reacting with enabled navigation and function emojis).
  .on('start', () => console.log('Started!'))
  // When the instance is finished by a user reacting with `delete` navigation emoji
  // or a function emoji that throws non-Error type.
  .on('finish', (user) => console.log(`Finished! User: ${user.username}`))
  // Upon a user reacting on the instance.
  .on('react', (user, emoji) => console.log(`Reacted! User: ${user.username} | Emoji: ${emoji.name} (${emoji.id})`))
  // When the awaiting timeout is reached.
  .on('expire', () => console.warn('Expired!'))
  // Upon an occurance of error (e.g: Discord API Error).
  .on('error', console.error);

await Embeds.build();
```
![Embeds2](https://github.com/gazmull/discord-paginationembed/blob/master/demo/Embeds.gif?raw=true)

## 💡🐛💻 Contributing
### Bug Reports
Please provide reproducible steps and results proofs (e.g: images). Also, solutions are welcome!

### Suggestions / Discussions
Please be explicit about the feature's description and provide a valid reason (e.g: beneficial to users or development time) why it should be added/changed/removed.

### Source Code
- Fork this repository.
- Execute `npm install`
- Code and code and code and code and... code!
  - To enable [**incremental compilation**](https://en.wikipedia.org/wiki/Incremental_compiler) to JS: `npm run dev:watch`
- `npm test` to verify if your additions/adjustments are following the project's codebase rules and to verify if the docs are valid.
- Please make sure that you have tested your changes very well.
    - There is a test bot script under `test` folder. To get started:
        - Copy `credentials.sample.js` to `credentials.js` and fill up your private credentials (token, test channel, etc)
        - Execute either:
          - One-time test: `npm run test:bot`
          - Hot-reloading test (nodemon): `npm run dev:start`
- File a [**Pull Request (PR)**](https://github.com/gazmull/discord-paginationembed/compare)!
- For the PR comment, it goes the same with **`Suggestions / Discussions`**.

# License
> [**MIT**](https://github.com/gazmull/discord-paginationembed/blob/master/LICENSE)

© 2018-present [**Euni (gazmull)**](https://github.com/gazmull)

[Documentation]: https://gazmull.github.io/discord-paginationembed/master
