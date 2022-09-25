const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

async function replyMessage({ number, text }) {
  try {
    if (!number) throw new Error("Number is required");
    if (!text) throw new Error("Text is required");

    const { stdout } = await execFile("termux-sms-send", ["-n", number, text]);
    console.log("Message sent successfully to: ", number);
    return {
      ok: true,
      message: "Message sent successfully to: " + number,
    };
  } catch (error) {
    console.log("Send message error: ", error);
    return {
      ok: false,
      message: error.message,
    };
  }
}

module.exports = replyMessage;
