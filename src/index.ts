import { mockWebGPUCanvas } from "./canvas"

export class MockGPUCommandEncoder {
	beginRenderPass() {
		return new MockGPURenderPassEncoder()
	}
	endRenderPass() {}
	finish() {}
}

export class MockGPUDevice {
	createCommandEncoder() {
		return new MockGPUCommandEncoder()
	}

	createBuffer() {
		return new MockGPUBuffer()
	}

	createTexture() {
		return new MockGPUTexture()
	}

	createSampler() {
		return new MockGPUSampler()
	}

	createBindGroupLayout() {
		return new MockGPUBindGroupLayout()
	}

	createBindGroup() {
		return new MockGPUBindGroup()
	}

	queue = {
		submit: (commandBuffers: MockGPUCommandEncoder[]) => {},
		writeBuffer: (buffer: MockGPUBuffer, offset: number, data: ArrayBuffer) => {},
	}
}

export class MockGPUAdapter {
	requestDevice() {
		return Promise.resolve(new MockGPUDevice())
	}
}

export class MockGPUBuffer {
	mapAsync() {
		return Promise.resolve()
	}
	getMappedRange(offset = 0, size?: number) {
		return new ArrayBuffer(size || 0)
	}
	unmap() {}
	destroy() {}
}

export class MockGPUTexture {
	createView() {
		return new MockGPUTextureView()
	}
}
export class MockGPUTextureView {}
export class MockGPUSampler {}
export class MockGPUBindGroupLayout {}
export class MockGPUBindGroup {}

export class MockGPURenderPassEncoder {
	setPipeline() {}
	draw() {}
	end() {}
	setBindGroup(index: number, bindGroup: MockGPUBindGroup) {}
}

const mockGPU = {
	requestAdapter: async () => new MockGPUAdapter(),
	getPreferredCanvasFormat: () => {
		return "bgra8unorm"
	},
}

export function mockWebGPU() {
	globalThis.navigator.gpu = mockGPU

	if (!globalThis.GPUTexture) {
		// @ts-ignore
		globalThis.GPUTexture = MockGPUTexture
	}
	if (!globalThis.GPUTextureUsage) {
		// @ts-ignore
		globalThis.GPUTextureUsage = {
			COPY_SRC: 1,
			COPY_DST: 2,
			TEXTURE_BINDING: 3,
			STORAGE_BINDING: 4,
			RENDER_ATTACHMENT: 5,
		}
	}

	if (!globalThis.GPUBufferUsage) {
		// @ts-ignore
		globalThis.GPUBufferUsage = {
			MAP_READ: 1,
			MAP_WRITE: 2,
			COPY_SRC: 4,
			COPY_DST: 8,
			INDEX: 16,
			VERTEX: 32,
			UNIFORM: 64,
			STORAGE: 128,
			INDIRECT: 256,
			QUERY_RESOLVE: 512,
		}
	}

	if (!globalThis.GPUShaderStage) {
		// @ts-ignore
		globalThis.GPUShaderStage = {
			VERTEX: 1,
			FRAGMENT: 2,
			COMPUTE: 4,
		}
	}

	if (!globalThis.GPUTextureView) {
		// @ts-ignore
		globalThis.GPUTextureView = MockGPUTextureView
	}

	if (!globalThis.GPUSampler) {
		// @ts-ignore
		globalThis.GPUSampler = MockGPUSampler
	}

	if (!globalThis.GPUBuffer) {
		// @ts-ignore
		globalThis.GPUBuffer = MockGPUBuffer
	}

	// globalThis.GPUBuffer = MockGPUBuffer
	// globalThis.GPUDevice = MockGPUDevice
	// globalThis.GPUAdapter = MockGPUAdapter
	// globalThis.GPUCommandEncoder = MockGPUCommandEncoder

	mockWebGPUCanvas()
}

mockWebGPU()
