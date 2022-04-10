# <img src="https://cdn.betterttv.net/emote/60441256306b602acc5983b0/3x" width="30"> 7TV Rest API <img src="https://cdn.betterttv.net/emote/58ae8407ff7b7276f8e594f2/3x" width="30">

[![Build Status](https://github.com/MelanX/7tv-rest/actions/workflows/test.yml/badge.svg)](https://github.com/MelanX/7tv-rest/actions)
[![NPM version](https://badge.fury.io/js/7tv-rest.svg)](https://badge.fury.io/js/7tv-rest)
[![GitHub stars](https://img.shields.io/github/stars/melanx/7tv-rest.svg)](https://github.com/MelanX/7tv-rest)

An API wrapper for the [7TV Rest API](https://github.com/SevenTV/ServerGo/blob/master/docs/rest-api.md) to use with Node.js.

## 💾 Install
`npm install 7tv-rest`

## 📚 Usage
```js
const SevenTV = require('7tv-rest')

const emotes = await SevenTV.getGlobalEmotes();
emotes.forEach(emote => console.log(emote.id));

const user = await SevenTV.getUser('melanx');
console.log(user.display_name);
```
