// take a photo and send a deta drive
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const replyMessage = require("../helpers/reply-message");

async function handler({ number, body } /** termux message object */) {
  try {
    await execFile("termux-telephony-call", [number]);

    await replyMessage({
      number,
      text: `Hold on, calling you...`,
    });
  } catch (error) {
    console.log(error);
    await replyMessage({
      number,
      text: `Error while call: ${error.message}`,
    });
  }
}

module.exports = {
  command: "CALLME",
  handler,
};
