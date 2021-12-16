const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Collection, Client, Formatters, Intents } = require("discord.js");
const { Users, CurrencyShop } = require("./dbObjects.js");
const dotenv = require("dotenv");

// get process vars
dotenv.config();

// client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.currency = new Collection();

// sequelize helper methods
Reflect.defineProperty(client.currency, "add", {
  value: async function add(id, amount) {
    const user = client.currency.get(id);

    if (user) {
      user.balance += Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ user_id: id, balance: amount });
    client.currency.set(id, newUser);

    return newUser;
  },
});

Reflect.defineProperty(client.currency, "getBalance", {
  value: function getBalance(id) {
    const user = client.currency.get(id);
    return user ? user.balance : 0;
  },
});

// load commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// load events
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// login
client.login(process.env.DISCORD_TOKEN);
