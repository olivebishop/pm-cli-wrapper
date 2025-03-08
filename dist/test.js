"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
async function runTests() {
    const wrapper = new index_1.default();
    try {
        // Test listing markets
        console.log('Listing markets with "Oscar" filter:');
        const markets = await wrapper.listMarkets('Oscar');
        console.log(markets.slice(0, 2)); // First 2 for brevity
        // Test order book
        console.log('\nOrder book for token:');
        const orderBook = await wrapper.getOrderItem('12110463059584809904811790486163860991533989713640269122405796144537637099628');
        console.log(orderBook);
        // Uncomment to test API keys generation
        // console.log('\nGenerating API keys:');
        // const apiKeys = await wrapper.generateApiKeys();
        // console.log(apiKeys);
    }
    catch (error) {
        console.error('Test failed:', error instanceof Error ? error.message : String(error));
    }
}
runTests();
