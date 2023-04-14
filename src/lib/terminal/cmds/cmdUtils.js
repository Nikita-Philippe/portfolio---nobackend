import commands from "../../../data/cmd.json";

export function getInitial() {
  return commands.find((cmd) => cmd.initial === true).cmd;
}

export function getMenu() {
  return commands.find((cmd) => cmd.cmd === "cmd_menu").content;
}

export function getInitialRunLines() {
  return commands.find((cmd) => cmd.initial === true).content;
}