// take a photo and send a deta drive
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const { Deta } = require("deta"); // import Deta
const replyMessage = require("../helpers/reply-message");
const { unlinkSync } = require("fs");
const config = require("../config");

async function handler({ number, body } /** termux message object */) {
  try {
    const DETA_KEY = process.env.DETA_KEY;
    const DETA_PROJECT_ID = process.env.DETA_PROJECT_ID;
    if (!DETA_KEY) throw new Error(`Please add 'DETA_KEY' to .env file`);
    if (!DETA_PROJECT_ID)
      throw new Error(`Please add 'DETA_PROJECT_ID' to .env file`);

    const deta = Deta(DETA_KEY);
    const detaDrive = deta.Drive("termux-surveillance");

    let cameraNum = 0;
    let args = body.split(" ");
    if (args[1]) {
      if (!isNaN(args[1])) {
        cameraNum = args[1];
      }
    }
    cameraNum = cameraNum.toString();
    let isBack = false;

    let { stdout: cameraInfo } = await execFile("termux-camera-info"); // camera info
    cameraInfo = JSON.parse(cameraInfo);
    if (cameraInfo.length === 0) throw new Error("No camera found");
    let findModule = cameraInfo.find((camera) => camera.id === cameraNum);
    if (!findModule) {
      cameraNum = cameraInfo[0].id;
    } else {
      if (findModule.facing === "back") {
        isBack = true;
      }
    }

    // turn on flash
    if (isBack) {
      await execFile("termux-torch", ["on"]);
    }

    const photoId = new Date().getTime() + ".jpg";

    // take photo and upload
    async function takeAndUpload() {
      await execFile("termux-camera-photo", [
        "-c",
        cameraNum,
        `./data/${photoId}`,
      ]);

      // wait for 2 second
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await detaDrive.put(photoId, {
        path: __dirname + `/../data/${photoId}`,
        contentType: "image/jpeg",
      });
    }

    try {
      takeAndUpload();
    } catch (__) {
      takeAndUpload(); // try again
    }

    // delete local file
    try {
      unlinkSync(__dirname + `/../data/${photoId}`);
    } catch (__) {}

    // turn off flash
    if (isBack) {
      await execFile("termux-torch", ["off"]);
    }

    await replyMessage({
      number,
      text: `Link: ${config.CF_DETA_PROXY_HOST}/${DETA_PROJECT_ID}/${DETA_KEY}/${photoId}`,
    });
  } catch (error) {
    console.log(error);
    await replyMessage({
      number,
      text: `Error to take a photo: ${error.message}`,
    });
  }
}

module.exports = {
  command: "TAKEPHOTO",
  handler,
};
