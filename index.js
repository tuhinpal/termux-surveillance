require("dotenv").config();
const getMessages = require("./helpers/get-messages");
const { readdirSync } = require("fs");
const matchCommand = require("./helpers/match-command");

const commands = [];
readdirSync(__dirname + "/commands").forEach((file) => {
  if (file.endsWith(".js")) {
    commands.push(require(__dirname + "/commands/" + file));
  }
});

async function process() {
  try {
    const messages = await getMessages();
    for (let message of messages) {
      let matcher = matchCommand({ message, commands });
      if (matcher) {
        await matcher.handler(message);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  while (true) {
    console.log("Checking for new messages...");
    await process();
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

main();
