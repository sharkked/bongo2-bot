const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rob")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    return interaction.reply("Pong!");
  },
};
