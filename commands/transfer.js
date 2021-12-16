const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("transfer")
    .setDescription("Transfers currency to a user.")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount to transfer")
        .setRequired(true)
    ),
  async execute(interaction) {
    const currency = interaction.client.currency;
    const currentAmount = currency.getBalance(interaction.user.id);
    const transferTarget = interaction.options.getUser("user");
    const transferAmount = interaction.options.getInteger("amount");

    if (transferAmount > currentAmount)
      return interaction.reply(
        `Sorry <@${interaction.user.id}>, you only have ${currentAmount}`
      );
    if (transferAmount <= 0)
      return interaction.reply(
        `<@${interaction.user.id}> you can't transfer nothing or less!`
      );

    currency.add(interaction.user.id, -transferAmount);
    currency.add(transferTarget.id, transferAmount);

    return interaction.reply(
      `<@${interaction.user.id}> gave <@${transferTarget.id}> ${transferAmount}!`
    );
  },
};
