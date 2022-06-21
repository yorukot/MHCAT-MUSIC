const {
    Collection,
    Client,
} = require('discord.js');
const fs = require("fs")
const { Player } = require("discord-music-player");
const {
    mongooseConnectionString,
    cookie
} = require("./config.json");
const client = new Client({
    partials: ["CHANNEL"],
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});
const player = new Player(client, {
    leaveOnEmpty: true,
    timeout: 300000,
    //ytdlRequestOptions: { 
    //    headers: {
    //        Cookie: cookie
    //    }
    //},
});
client.player = player;
module.exports = client;
const logs = require('discord-logs');
logs(client, {
    debug: true
}); // thats all jk
client.commands = new Collection()
client.config = require('./config.json')
client.prefix = client.config.prefix
client.aliases = new Collection()
client.slash_commands = new Collection();


require('./handler/slash_commands');
require('./handler')(client);
client.login(client.config.token)