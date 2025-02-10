import { mockWebGPUCanvas } from "./canvas"

export class MockGPUCommandEncoder {
	beginRenderPass() {}
	endRenderPass() {}
}

export class MockGPUDevice {
	createCommandEncoder() {
		return new MockGPUCommandEncoder()
	}

	createSampler() {
		return {}
	}
}

export class MockGPUAdapter {
	requestDevice(descriptor?: GPUDeviceDescriptor) {
		return Promise.resolve(new MockGPUDevice())
	}
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

const mockGPU = {
	requestAdapter: async () => new MockGPUAdapter(),
	getPreferredCanvasFormat: () => {
		return "bgra8unorm"
	},
}

export function mockWebGPU() {
	globalThis.navigator.gpu = mockGPU

	mockWebGPUCanvas()
}

mockWebGPU()
