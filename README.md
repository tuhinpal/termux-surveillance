# Termux surveillance

A simple surveillance tool that can be interacted with SMS.

### Installation 🏗️

- Install termux and termux api
- Run these commands

  ```bash
  pkg update
  pkg install termux-api
  pkg install git
  pkg install nodejs
  git clone https://github.com/tuhinpal/termux-surveillance.git
  cd termux-surveillance
  npm install
  bash start.sh
  ```

- If you want to run it when termux starts, install termux boot then run this command

  ```bash
  cp $HOME/termux-surveillance/start.sh $HOME/.termux/boot/termuxsurveillance
  chmod 777 $HOME/.termux/boot/termuxsurveillance
  ```

### Environment variables 📝

Create a file named `.env` in the root directory (Or copy `.env.example`) and add these variables.

- `ALLOW_NUMBERS` - A comma-separated list of numbers that are allowed to use this tool. If this is not set, then all numbers are allowed.
- `DETA_KEY` - Your [Deta](https://deta.sh) Drive key, which is required for storing images.
- `DETA_PROJECT_ID` - Your [Deta](https://deta.sh) Drive Project Id, which is required for storing images.

### Commands 😵‍💫

You need to send command through SMS. The command should be in the format `command argument`. For example, `TAKEPHOTO 1` will take a photo from the front camera.

- `CALLME` - Call the number which sent the command.
- `TAKEPHOTO` - Take a photo from the front camera. The argument should be the camera id. For example, `TAKEPHOTO 1` will take a photo from the front camera (for my old phone).

### Development 🛠️

Please see [this](https://github.com/tuhinpal/termux-surveillance/blob/master/commands/call-me.js) for an example of how to add a new command.

### Disclaimer ⚠️

This project is made to save the cost of a CCTV camera. I am not responsible for any misuse of this tool. Use it at your own risk.

### License & Copyright 📜

- This Project is [Apache-2.0](https://github.com/tuhinpal/termux-surveillance/blob/master/LICENSE) Licensed
- Copyright 2022 by [Tuhin Kanti Pal](https://github.com/tuhinpal)

## Made with ❤️ by [Tuhin Kanti Pal](https://github.com/tuhinpal) in weekend 🚀
