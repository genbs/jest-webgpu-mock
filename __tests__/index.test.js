import { MockGPUAdapter, MockGPUDevice, mockWebGPU } from "../lib/index"

describe("WebGPU Mock", () => {
	it("should setup after resetAllMocks", () => {
		jest.resetAllMocks()
		expect(document.createElement("canvas").getContext("webgpu")).toBe(undefined)
		mockWebGPU()
		expect(document.createElement("canvas").getContext("webgpu")).toHaveProperty("getCurrentTexture")
		jest.resetAllMocks()
		expect(document.createElement("canvas").getContext("webgpu")).toBe(undefined)
	})

	it("should mock GPUDevice", async () => {
		const adapter = await navigator.gpu.requestAdapter()
		expect(adapter).toBeInstanceOf(MockGPUAdapter)
		expect(navigator.gpu.getPreferredCanvasFormat()).toBe("bgra8unorm")
	})

	it("should mock buffer creation", async () => {
		const device = new MockGPUDevice()
		const buffer = device.createBuffer()
		expect(buffer).toBeDefined()
	})

	it("should mock createBindGroupLayout", async () => {
		const device = new MockGPUDevice()
		const bindGroupLayout = device.createBindGroupLayout()
		expect(bindGroupLayout).toBeDefined()
	})

	it("should mock createBindGroup", async () => {
		const device = new MockGPUDevice()
		const bindGroup = device.createBindGroup()
		expect(bindGroup).toBeDefined()
	})

	it("should mock GPURenderPassEncoder setBindGroup", async () => {
		const device = new MockGPUDevice()
		const commandEncoder = device.createCommandEncoder()
		const passEncoder = commandEncoder.beginRenderPass()
		expect(passEncoder.setBindGroup).toBeDefined()
		expect(passEncoder.end).toBeDefined()
		const bindGroup = device.createBindGroup()
		passEncoder.setBindGroup(0, bindGroup)
		expect(passEncoder).toBeDefined()
	})

	it("should mock device queue submit", async () => {
		const device = new MockGPUDevice()
		const commandEncoder = device.createCommandEncoder()
		const passEncoder = commandEncoder.beginRenderPass()
		passEncoder.end()
		const commandBuffer = commandEncoder.finish()
		device.queue.submit([commandBuffer])
		expect(device.queue.submit).toBeDefined()
	})

	it("should mock device queue writeBuffer", async () => {
		const device = new MockGPUDevice()
		const buffer = device.createBuffer()
		const data = new ArrayBuffer(8)
		device.queue.writeBuffer(buffer, 0, data)
		expect(device.queue.writeBuffer).toBeDefined()
	})
})
