const { SlashCommandBuilder } = require("@discordjs/builders");
const { Users } = require("../dbObjects.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Show a user's inventory"),
  async execute(interaction) {
    const target = interaction.options.getUser("user") ?? interaction.user;
    const user = await Users.findOne({ where: { user_id: target.id } });
    const items = await user.getItems();

    if (!items.length) return interaction.reply(`<@${target.id}> has nothing!`);

    return interaction.reply(
      `${target.tag} currently has ${items
        .map((i) => `${i.amount} ${i.item.name}`)
        .join(", ")}`
    );
  },
};
