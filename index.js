const { App } = require("@slack/bolt");
const { gbbs } = require("./command/gbbs");
const { modalSubmit } = require("./view/modalSubmit");
const { SIGNING_SECRET, TOKEN } = require("./constrants");

const app = new App({
  signingSecret: SIGNING_SECRET,
  token: TOKEN
});

app.event("team_join", ({ event, say }) => {
  say(
    `<@${event.user}>さん、はじめまして。こちらのbotから登録をお願い致します。`
  );
});

app.command("/gbbs", gbbs);

app.view("view_modal", modalSubmit);

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
