import { MockGPUAdapter } from "."

declare global {
	interface Navigator {
		gpu: {
			requestAdapter: () => Promise<MockGPUAdapter>
			getPreferredCanvasFormat: () => string
		}
	}
}

export {}
