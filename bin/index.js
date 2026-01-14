#!/usr/bin/env node

import fsx from "fs-extra";
import path from 'path'
import prompt from "prompt";
import {install,uninstall} from "./install.js";
import colors from "@colors/colors/safe.js";

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('Missing command, exiting');
    process.exit(1); 
  }

const command = args?.[0];


 
switch (command) {
  case "--install":
  case "--install-css":
    /** import cssfabric files */
    install();
    break;
  case "--uninstall":
    /** delete cssfabric files */
    uninstall();
    break;
}
 
