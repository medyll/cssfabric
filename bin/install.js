#!/usr/bin/env node

import fsx from "fs-extra";
import prompt from "prompt";
import colors from "@colors/colors/safe.js";
import { exec } from "node:child_process";

const yesNoPattern = {
  pattern: /^(Y|n)$/,
  default: "Y",
  type: "string",
  required: true,
};

const installSchema = {
  properties: {
    install: {
      description:
        "Copy the cssfabric files to the .cssfabric directory ? " +
        colors.green("Y/n"),
      ...yesNoPattern,
    },
    gitIgnore: {
      description: "Add .cssfabric to gitignore ? " + colors.green("Y/n"),
      ...yesNoPattern,
    },
  },
};

const unInstallSchema = {
  properties: {
    uninstall: {
      description:
        "delete the cssfabric files from .cssfabric directory ? " +
        colors.green("Y/n"),
      ...yesNoPattern,
    },
  },
};

var run = function (cmd) {
  var child = exec(cmd, function (error, stdout, stderr) {
    if (stderr !== null) {
    }
    if (stdout !== null) {
    }
    if (error !== null) {
    }
  });
};

/** import cssfabric files to .cssfabric */
export const install = async () => {


};

/** uninstall .cssfabric files */
export const uninstall = async () => {
  prompt.start();
  const { uninstall } = await prompt.get(unInstallSchema);
  if (uninstall === "Y") {
    fsx.remove("./.cssfabric/");
  }
};

const installCssFiles = async () => {
  try {
    await fsx.copy("./src/lib/styles", "./.cssfabric/styles/"); 
  } catch (err) {
    console.error(err); 
    console.error("exiting");
    process.exit(1);
  }
};

const installScssFiles = async () => {
  try {
    await fsx.copy("./src/cssfabric/modules", "./.cssfabric/modules");
   
  } catch (err) { 
    console.error("exiting");
    process.exit(1);
  }
};
