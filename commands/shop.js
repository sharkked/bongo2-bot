const { Formatters } = require("discord.js");
const { CurrencyShop } = require("../dbObjects.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Displays the shop"),
  async execute(interaction) {
    const items = await CurrencyShop.findAll();
    return interaction.reply(
      Formatters.codeBlock(items.map((i) => `${i.name}: ${i.cost}`).join("\n"))
    );
  },
};
