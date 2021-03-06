/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

import { ICommandDefinition } from "@zowe/imperative";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).STOP.RESOURCES.REGION;

export const RegionDefinition: ICommandDefinition = {
    name: "region", aliases: ["reg"],
    description: strings.DESCRIPTION,
    handler: __dirname + "/Region.handler",
    type: "command",
    positionals: [],
    outputFormatOptions: true,
    options: [
        {
            name: "region-ids", aliases: ["ri"],
            description: strings.OPTIONS.REGIONIDS,
            type: "array",
            conflictsWith: ["job-name"]
        },
        {
            name: "job-name", aliases: ["jn"],
            description: strings.OPTIONS.JOBNAME,
            type: "string",
            conflictsWith: ["region-ids"],
        },
        {
            name: "route",
            description: strings.OPTIONS.ROUTE,
            type: "array",
            aliases: ["rte"]
        },
        {
            name: "abdump",
            description: strings.OPTIONS.ABDUMP,
            type: "string",
        },
        {
            name: "cancel",
            description: strings.OPTIONS.CANCEL,
            type: "boolean"
        },
        {
            name: "transaction",
            description: strings.OPTIONS.TRANSACTION,
            type: "string"
        }],
    mustSpecifyOne: ["job-name", "region-ids"],
    profile: {optional: ["ims"]},
    examples: [{
        description: strings.EXAMPLES.EX1,
        options: "--job-name \"JOBNM1\""
    },
    {
        description: strings.EXAMPLES.EX2,
        options: "--region-ids 4 5"
    },
    {
        description: strings.EXAMPLES.EX3,
        options: "--region-ids 4 --abdump \"TRAN1\""
    },
    {
        description: strings.EXAMPLES.EX4,
        options: "--region-ids 4 --cancel true"
    },
    {
        description: strings.EXAMPLES.EX5,
        options: "--job-name \"JOBNM4\" --user \"username\" --pass \"pass1234\" --host \"localhost\" --port 8080" +
          "--ich \"zos1\" --icp 9999 --plex \"PLEX1\""
    }]
};
