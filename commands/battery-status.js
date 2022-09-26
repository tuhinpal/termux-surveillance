// take a photo and send a deta drive
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const replyMessage = require("../helpers/reply-message");

async function handler({ number, body } /** termux message object */) {
  try {
    let { stdout: battStatus } = await execFile("termux-battery-status");
    battStatus = JSON.parse(battStatus);

    let message = `${battStatus.percentage}% remaining, ${
      battStatus.plugged
    }, ${battStatus.status}, ${Math.floor(
      battStatus.temperature
    )}°C temperature`;

    await replyMessage({
      number,
      text: message,
    });
  } catch (error) {
    console.log(error);
    await replyMessage({
      number,
      text: `Error while getting battery status: ${error.message}`,
    });
  }
}

module.exports = {
  command: "BATTERYSTATUS",
  handler,
};
