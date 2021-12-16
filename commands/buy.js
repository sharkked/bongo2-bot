const { Op } = require("sequelize");
const { Users, CurrencyShop } = require("../dbObjects.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Buy an item from the shop")
    .addStringOption((option) =>
      option.setName("item").setDescription("The item to buy").setRequired(true)
    ),
  async execute(interaction) {
    const currency = interaction.client.currency;
    const itemName = interaction.options.getString("item");
    const item = await CurrencyShop.findOne({
      where: { name: { [Op.like]: itemName } },
    });

    if (!item) return interaction.reply(`That item doesn't exist.`);
    if (item.cost > currency.getBalance(interaction.user.id)) {
      return interaction.reply(
        `You only have ${currency.getBalance(interaction.user.id)}! ${
          item.name
        } costs ${item.cost}`
      );
    }

    const user = await Users.findOne({
      where: { user_id: interaction.user.id },
    });
    currency.add(interaction.user.id, -item.cost);
    await user.addItem(item);

    return interaction.reply(
      `<@${interaction.user.id}>, fuck you. -${item.cost}`
    );
  },
};
