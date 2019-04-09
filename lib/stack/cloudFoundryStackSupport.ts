
import { StackSupport } from "@atomist/sdm-pack-analysis";
import { CloudFoundryDeployInterpreter } from "./CloudFoundryDeployInterpreter";
import { cloudFoundryScanner } from "./cloudFoundryScanner";

/**
 * CloudFoundry stack support based on sdm-pack-analysis. Used in Uhura-based SDMs.
 * @return {StackSupport}
 */
export function cloudFoundryStackSupport(): StackSupport {
    return {
        scanners: [cloudFoundryScanner],
        interpreters: [
            new CloudFoundryDeployInterpreter(),
        ],
        transformRecipeContributors: [],
    };
}
