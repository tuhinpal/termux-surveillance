const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

async function getMessages() {
  let command = "termux-sms-list";
  let { stdout } = await execFile(command);
  stdout = JSON.parse(stdout);
  stdout = stdout.reverse();
  return stdout;
}

module.exports = getMessages;
