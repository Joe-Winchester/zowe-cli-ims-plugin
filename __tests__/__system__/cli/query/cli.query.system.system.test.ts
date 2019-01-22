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

import { runCliScript } from "../../../__src__/TestUtils";
import { ITestEnvironment } from "../../../__src__/environment/doc/response/ITestEnvironment";
import { TestEnvironment } from "../../../__src__/environment/TestEnvironment";

// Test environment will be populated in the "beforeAll"
let TEST_ENVIRONMENT: ITestEnvironment;
// let regionName: string;
// let host: string;
// let port: number;
// let user: string;
// let password: string;

describe("ims query transaction", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "query_transaction_command",
            installPlugin: true,
            tempProfileTypes: ["ims"]
        });
    });

    it("should display the query transaction help", async () => {
        const response = await runCliScript(__dirname + "/__scripts__/query_transaction_help.sh", TEST_ENVIRONMENT);
        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        expect(response.stdout.toString()).toMatchSnapshot();
    });

    it("should be able to successfully query transactions", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_transaction.sh", TEST_ENVIRONMENT,
            ["D*", "ALL"]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("dopt");
    });

    it("should be able to successfully get resources using profile options", async () => {
        const output = runCliScript(__dirname + "/__scripts__/query_transaction_fully_qualified.sh", TEST_ENVIRONMENT,
            ["D*",
                "ALL",
                TEST_ENVIRONMENT.systemTestProperties.ims.host,
                TEST_ENVIRONMENT.systemTestProperties.ims.port,
                TEST_ENVIRONMENT.systemTestProperties.ims.user,
                TEST_ENVIRONMENT.systemTestProperties.ims.password,
                TEST_ENVIRONMENT.systemTestProperties.ims.imsConnectHost,
                TEST_ENVIRONMENT.systemTestProperties.ims.imsConnectPort,
                TEST_ENVIRONMENT.systemTestProperties.ims.plex]);
        const stderr = output.stderr.toString();
        const stdout = output.stdout.toString();
        expect(stderr).toEqual("");
        expect(output.status).toEqual(0);
        expect(stdout).toContain("dopt");
    });
});
