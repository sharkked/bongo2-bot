const { Formatters } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Display the leaderboard"),
  async execute(interaction) {
    const client = interaction.client;
    return interaction.reply(
      Formatters.codeBlock(
        client.currency
          .sort((a, b) => b.balance - a.balance)
          .filter((user) => client.users.cache.has(user.user_id))
          .first(10)
          .map(
            (user, position) =>
              `(${position + 1}) ${client.users.cache.get(user.user_id).tag}: ${
                user.balance
              }`
          )
          .join("\n")
      )
    );
  },
};
