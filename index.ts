import { assert } from "node:console";

export default class MyPlugin {
	public readonly hooks: Record<string, () => void>
	private readonly serverless: any; // TODO: improve type

	constructor(serverless: any) { // TODO: improve type
		this.hooks = {
			'before:package:finalize': () => this.execute()
		}

	}

	private execute() {
		const cfnTemplate = this?.serverless?.service?.provider?.compiledCloudFormationTemplate
		assert(cfnTemplate !== undefined, 'CloudFormation template not ready.')
		assert(Array.isArray(cfnTemplate?.Resources), 'CloudFormation template invalid.')

		const resources: Array<Record<string, unknown>> = cfnTemplate.Resources

		const newResources = resources.map(resource => {
			if (resource.Type === "AWS::Logs::LogGroup") {
				return { ...resource, DeletionPolicy: "Retain" }
			}

			return resource
		})

		cfnTemplate.Resources = newResources
	}
}

