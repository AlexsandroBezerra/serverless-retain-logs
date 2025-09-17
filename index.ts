import { assert } from "node:console";

export default class MyPlugin {
	public readonly hooks: Record<string, () => void>
	private readonly serverless: any; // TODO: improve type

	constructor(serverless: any) { // TODO: improve type
		this.serverless = serverless
		this.hooks = {
			'before:package:finalize': () => this.execute()
		}

	}

	private execute() {
		const cfnTemplate = this?.serverless?.service?.provider?.compiledCloudFormationTemplate
		assert(cfnTemplate !== undefined, 'CloudFormation template not ready.')
		assert(Array.isArray(cfnTemplate?.Resources), 'CloudFormation template invalid.')

		const resources: Array<Record<string, unknown>> = cfnTemplate.Resources

		const newResources = Object.entries(resources).map(([key, resource]) => {
			if (resource.Type === "AWS::Logs::LogGroup") {
				return [key, { ...resource, DeletionPolicy: "Retain" }]
			}

			return [key, resource]
		})

		cfnTemplate.Resources = Object.fromEntries(newResources)
	}
}

