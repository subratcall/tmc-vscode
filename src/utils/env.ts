import * as cp from "child_process";
import { is } from "typescript-is";

import { TMC_LANGS_RUST_VERSION } from "../config/constants";
/**
 * Check if calling java programs is possible.
 */
export async function isJavaPresent(): Promise<boolean> {
    let result = false;
    await new Promise((resolve) =>
        cp.exec("java -version", (error) => {
            result = error === null;
            resolve();
        }),
    );

    return result;
}

export function getPlatform():
    | "linux32"
    | "linux64"
    | "windows32"
    | "windows64"
    | "macos64"
    | "macos32"
    | "arm64"
    | "arm"
    | "other" {
    const platform = process.platform;
    const arch = process.arch;
    if (platform === "linux") {
        if (arch === "x64") {
            return "linux64";
        } else if (arch === "arm64") {
            return "arm64";
        } else if (arch === "arm") {
            return "arm";
        } else {
            return "linux32";
        }
    } else if (platform === "win32") {
        return arch === "x64" ? "windows64" : "windows32";
    } else if (platform === "darwin") {
        return arch === "x64" ? "macos64" : "macos32";
    }
    return "other";
}

export function getRustExecutable(platform: string): string {
    switch (platform) {
        case "linux32":
            return "tmc-langs-cli-i686-unknown-linux-gnu-" + TMC_LANGS_RUST_VERSION;
        case "linux64":
            return "tmc-langs-cli-x86_64-unknown-linux-gnu-" + TMC_LANGS_RUST_VERSION;
        case "macos64":
            return "tmc-langs-cli-x86_64-apple-darwin-" + TMC_LANGS_RUST_VERSION;
        case "windows32":
            return "tmc-langs-cli-i686-pc-windows-msvc-" + TMC_LANGS_RUST_VERSION + ".exe";
        case "windows64":
            return "tmc-langs-cli-x86_64-pc-windows-msvc-" + TMC_LANGS_RUST_VERSION + ".exe";
        case "arm":
            return "tmc-langs-cli-armv7-unknown-linux-gnueabihf-" + TMC_LANGS_RUST_VERSION;
        case "arm64":
            return "tmc-langs-cli-aarch64-unknown-linux-gnu-" + TMC_LANGS_RUST_VERSION;
        default:
            return "tmc-langs-cli-x86_64-unknown-linux-gnu-" + TMC_LANGS_RUST_VERSION;
        // Currently set linux CLI as default, this is experimental, in future return error.
        // return new Err(new Error("Unexpected OS type from Node."));
    }
}

/**
 * Runs a test to see whether or not superfluous properties are enabled within typescript-is
 * properties.
 */
export function superfluousPropertiesEnabled(): boolean {
    // Use configuration properties to see whether superflous object properties are enabled in
    // tsconfig. In the code this feature is primarily used when fetched API data is being parsed.
    // For configuration, see tsconfig.json used by webpack.dev.json
    // and tsconfig.production.json used by webpack.prod.json
    type TestType = {
        strict: boolean;
    };

    const testObject = {
        strict: true,
        superflous: "a superfluous property",
    };

    return is<TestType>(testObject);
}
