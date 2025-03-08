"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PmarketWrapper = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
class PmarketWrapper {
    constructor(cliPath = 'pmarket-cli') {
        this.cliPath = cliPath;
    }
    // Helper to run commands and parse JSON output
    async runCommand(command) {
        try {
            const { stdout, stderr } = await execPromise(`${this.cliPath} ${command}`);
            if (stderr && !stdout)
                throw new Error(`CLI Error: ${stderr}`);
            return stdout ? JSON.parse(stdout.trim()) : {};
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Command "${command}" failed: ${errorMessage}`);
        }
    }
    // List markets with optional filter
    async listMarkets(filter = '') {
        return this.runCommand(`-l "${filter}"`);
    }
    // Buy tokens
    async buyToken(tokenId, amount, price) {
        return this.runCommand(`-b ${tokenId} ${amount} ${price}`);
    }
    // Sell tokens
    async sellToken(tokenId, amount, price) {
        return this.runCommand(`-s ${tokenId} ${amount} ${price}`);
    }
    // Set USDC allowance
    async setAllowance(amount) {
        return this.runCommand(`-a ${amount}`);
    }
    // Show order Item for a token
    async getOrderItem(tokenId) {
        return this.runCommand(`-o ${tokenId}`);
    }
    // Generate or get API keys
    async generateApiKeys() {
        return this.runCommand('-k');
    }
    // Cancel all open orders
    async cancelAllOrders() {
        return this.runCommand('-c');
    }
}
exports.PmarketWrapper = PmarketWrapper;
exports.default = PmarketWrapper;
