const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING"
  ],
  partials: ["CHANNEL", "MESSAGE", "REACTIONS"],
  allowedMentions: { parse: ["users", "roles", "everyone"], repliedUser: true }
});

client.on("ready", () => {
  console.log("Bot is online! Use !unbanall to unban all users.");
});

client.on("messageCreate", message => {
  switch (message.content.toLowerCase()) {
    case "!unbanall":
      if (message.member.permissions.has("BAN_MEMBERS")) {
        message.guild.bans
          .fetch()
          .then(bans => {
            if (bans.size == 0) {
              message.reply({ content: "There are no banned users." });
              throw "No members to unban.";
            }
            bans.forEach(ban => {
              message.guild.members.unban(ban.user.id);
            });
          })
          .then(() => console.log("Users are being unbanned."))
          .catch(e => console.log(e))
          .then(message.reply({ content: "Mass-Unban successful" }));
      } else {
        console.log("You do not have enough permissions for this command.");
      }
      break;
  }
});

client.login(process.env.TOKEN);
