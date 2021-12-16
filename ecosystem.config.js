module.exports = {
  apps: [
    {
      name: "app1",
      script: "./app.js",
      watch: true,
      ignore_watch: [
        "node_modules",
        "database.sqlite",
        "database.sqlite-journal",
      ],
    },
  ],
};
