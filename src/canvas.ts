import { MockGPUTexture } from "."

export class MockGPUCanvasContext {
	configure() {}

	getCurrentTexture() {
		return new MockGPUTexture()
	}
}

export function mockWebGPUCanvas() {
	const getContextMock = jest.fn().mockImplementation((contextType: string) => {
		if (contextType === "webgpu") {
			return new MockGPUCanvasContext()
		}
		return null
	})

	let htmlCanvasElementPrototype = HTMLCanvasElement.prototype

	htmlCanvasElementPrototype.getContext = getContextMock
}
