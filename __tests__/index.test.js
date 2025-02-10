import { MockGPUDevice, mockWebGPU } from "../lib/index"

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
		expect(adapter).toBeInstanceOf(MockGPUDevice)
		expect(navigator.gpu.getPreferredCanvasFormat()).toBe("bgra8unorm")
	})

	it("should mock buffer creation", async () => {
		const device = new MockGPUDevice()
		const buffer = device.createBuffer()
		expect(buffer).toBeDefined()
	})
})
