const { prefix } = require("../config.json");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;
    message.client.currency.add(message.author.id, 1);

    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      if (command === "ping") {
        message.channel.send("shut the fuck up lol");
      }
    } else {
      let words = message.content.split(/ +/g);
      if (/([^ ]{2,}er|impostor)$/gi.test(message.content)) {
        message.channel.send(
          `${words[words.length - 1]
            .toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase())}? I hardly know her!`
        );
      } else if (/^i['`]?m$/gi.test(words[0]) && words.length > 1) {
        message.channel.send(
          `Hi ${message.content
            .slice(words[0].length + 1)
            .toLowerCase()}, I'm dad!`
        );
      }

      if (/^n[-n ]*[wy ]*[o0][ o0]*\W*$/gi.test(message.content)) {
        message.channel.send("Yes!");
      } else if (/^nope\W*$/gi.test(message.content)) {
        message.channel.send("Yep!");
      }

      if (/^a{12,}$/gi.test(message.content)) {
        message.react("🤔");
      }
    }
  },
};
