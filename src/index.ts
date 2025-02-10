import { mockWebGPUCanvas } from "./canvas"

export class MockGPUDevice {
	createBuffer() {
		return new MockGPUBuffer()
	}

	createTexture() {
		return new MockGPUTexture()
	}
}

export class MockGPUBuffer {
	mapAsync() {
		return Promise.resolve()
	}
}

export class MockGPUTexture {}

export function mockWebGPU() {
	// @ts-ignore
	globalThis.navigator.gpu = {
		requestAdapter: async () => new MockGPUDevice(),
	}

	mockWebGPUCanvas()
}
