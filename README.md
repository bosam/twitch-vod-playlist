# Twitch VOD Playlist

<p align="center">
<img src="https://raw.githubusercontent.com/bosam/twitch-vod-playlist/master/src/electron-app/icon.png" alt="Twitch VOD Playlist" width="50" />
</p>

Twitch VOD Playlist is a very simple Electron app made to list a streamer's videos-on-demand and call a script with the url's location as its first parameter.

This project uses as base [Electron-vue-boilerplate](https://github.com/oliverfindl/electron-vue-boilerplate).
It runs VueJS within Electron.

Please keep in mind that this project is very young and needs refinement. I mainly created it for my own enjoyment.

**Why?**
--

The idea behind the application is to allow watching VOD streams with a media player easily. It is specifically useful for low-end computers which struggle with not enough memory.

**How?**
--

The application only lists all the latest videos from a user channel. Nodejs allows for spawning a child process that can be anything.
Coupled with [Streamlink](https://github.com/streamlink/streamlink), you can easily open any videos in your favorite media player.

I currently am using a script that calls for streamlink and open Media Player Classic.

```
#!/bin/bash
"LOCATION_TO_STREAMLINK/streamlink.bat" --player-passthrough hls --player "LOCATION_TO_MEDIA_PLAYER_CLASSIC/mpc.exe" $1 $2 
```

**$1** being the url of the video

**$2** being the quality wanted (best) -- It can be forced

**Application Setup**
--

<p align="center">
<img src="https://raw.githubusercontent.com/bosam/twitch-vod-playlist/master/assets/settings.png" alt="Settings" />
</p>

In order to properly contact Twitch API, you need to create a ClientID/Client Secret credentials that you will set in the application.

Log in your [Twitch Dev Console](https://dev.twitch.tv/console) and create an application.
 
There is no need for OAuth Redirect URLs as we are only requesting Authentication token for ourselves. (ex: http://localhost:3000).

Next is setting up a path to a script.

```
PATH_TO_MY_SCRIPT.bat
```

Remember 2 arguments will be passed to that script **$1** being the url location of the video and **$2** being the quality requested.

**How to Contribute**
---

1. Clone repo and create a new branch: `$ git checkout https://github.com/bosam/twitch-vod-playlist -b name_for_new_branch`.
2. Make changes and test
3. Submit Pull Request with comprehensive description of changes
