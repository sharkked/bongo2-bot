const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Show a user's balance.")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user")
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("user") ?? interaction.user;
    return interaction.reply(
      `<@${target.id}> has ${interaction.client.currency.getBalance(target.id)}`
    );
  },
};
