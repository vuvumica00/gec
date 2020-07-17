#!/usr/bin/env node

const { AutoComplete, prompt } = require("enquirer");
const { exec } = require("child_process");
const { getGitmojis, logSpace } = require("../lib");

async function main() {
  logSpace();
  console.log(
    "\x1b[33m",
    "Fetching the latest gitmojis from the gitmoji api..."
  );
  logSpace();

  const emojis = await getGitmojis().catch((err) => {
    console.log("\x1b[31m", "Failed to fetch gitmojis from the gitmoji api:");
    console.error(new Error(err).message || "");
  });

  if (!emojis) return;

  console.log("\x1b[32m", "Successfully fetched gitmojis!");
  logSpace();

  const select = new AutoComplete({
    name: "emoji",
    message: "Choose/Search an emoji",
    limit: 25,
    choices: emojis.map(
      (emoji) => `${emoji.emoji} - ${emoji.code} - ${emoji.description}`
    ),
  });

  const emojiResult = await select.run();
  const emoji = emojiResult.split(" ")[2];

  const response = await prompt({
    type: "input",
    name: "message",
    message: "Enter your commit message:",
  });

  exec(
    `git commit -m '${emoji} ${response.message}'`,
    (error, stdout, stderr) => {
      if (error) {
        return console.log(`error: ${error.message}`);
      }
      if (stderr) {
        return console.log(`stderr: ${stderr}`);
      }
      console.log(`${emoji} ${response.message}`);
    }
  );
}

main();
