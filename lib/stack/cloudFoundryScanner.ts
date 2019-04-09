import {
    TechnologyScanner,
    TechnologyStack,
} from "@atomist/sdm-pack-analysis";
import { HasCloudFoundryManifest } from "@atomist/sdm-pack-cloudfoundry";

export interface CloudFoundryStack extends TechnologyStack {
    name: "cloudfoundry";
}

export const cloudFoundryScanner: TechnologyScanner<CloudFoundryStack> = async p => {
    const hasManifest = await HasCloudFoundryManifest.predicate(p);
    if (hasManifest) {
        return {
            name: "cloudfoundry",
            tags: ["cloudfoundry"],
        };
    } else {
        return undefined;
    }
};
