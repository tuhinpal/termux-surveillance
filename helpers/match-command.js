const { readFileSync, writeFileSync } = require("fs");

function matchCommand({ message = {}, commands = [] }) {
  try {
    const allowedNumbers = process.env.ALLOW_NUMBERS
      ? process.env.ALLOW_NUMBERS.split(",").map((n) => n.trim())
      : null;
    let datapath = __dirname + "/../data/.completed";
    let completed = [];
    try {
      let file = readFileSync(datapath);
      completed = JSON.parse(file);
    } catch (_) {}

    if (
      !completed.find(
        (item) =>
          item.number === message.number &&
          item.received === message.received &&
          item.body === message.body
      )
    ) {
      completed.push({
        number: message.number,
        received: message.received,
        body: message.body,
      });
      writeFileSync(datapath, JSON.stringify(completed));

      if (
        allowedNumbers
          ? allowedNumbers.find((n) => message.number.endsWith(n))
          : true
      ) {
        let matchedCommand = commands.find((command) =>
          message.body.trim().toUpperCase().startsWith(command.command)
        );

        if (matchedCommand) {
          console.log("Matched command: ", matchedCommand.command);
          return matchedCommand;
        }
      } else {
        console.log("Number not allowed: ", message.number);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}

module.exports = matchCommand;
