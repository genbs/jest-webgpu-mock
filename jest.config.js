/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "jsdom",
	collectCoverage: true,
	collectCoverageFrom: ["lib/index.js"],
	setupFiles: ["./lib/index.js"],
}
