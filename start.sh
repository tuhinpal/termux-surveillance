#!/data/data/com.termux/files/usr/bin/sh

termux-wake-lock

# create a tmux screen
tmux new-session -d -s termuxsurveillance
# start a command in the tmux screen
tmux send-keys -t termuxsurveillance 'cd $HOME/termux-surveillance && npm start' C-m
