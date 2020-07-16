const { AutoComplete, prompt } = require("enquirer");
const { exec } = require("child_process");
const emojis = require("./emojis.json");

async function main() {
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
