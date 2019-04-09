import {
    goals,
    isMaterialChange,
    SdmContext,
} from "@atomist/sdm";
import {
    Interpretation,
    Interpreter,
} from "@atomist/sdm-pack-analysis";
import {
    CloudFoundryDeploy,
    CloudFoundryDeploymentStrategy,
} from "@atomist/sdm-pack-cloudfoundry";
import { CloudFoundryStack } from "./cloudFoundryScanner";

export class CloudFoundryDeployInterpreter implements Interpreter {
    public async enrich(interpretation: Interpretation, sdmContext: SdmContext): Promise<boolean> {
        const cloudFoundryStack = interpretation.reason.analysis.elements.cloudfoundry as CloudFoundryStack;
        if (!cloudFoundryStack) {
            return false;
        } else {
            const cloudfoundryDeploy = new CloudFoundryDeploy().with({
                environment: "staging",
                subDomainCreator: id => `${id.repo}`,
                strategy: CloudFoundryDeploymentStrategy.BLUE_GREEN,
                });
            interpretation.deployGoals = goals("deploy").plan(cloudfoundryDeploy);
            interpretation.materialChangePushTests.push(isMaterialChange({files: ["manifest.yaml"]}));
            return true;
        }
    }
}
