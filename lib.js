const fetch = require("node-fetch");

async function getGitmojis() {
  const gitMojiResult = await fetch(
    "https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json"
  ).then((res) => res.json());

  return gitMojiResult.gitmojis;
}

function logSpace() {
  console.log("\n");
}

module.exports = { getGitmojis, logSpace };
