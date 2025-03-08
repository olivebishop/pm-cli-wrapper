"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const node_fetch_1 = __importDefault(require("node-fetch"));
const privateKey = "bbf404d172f62ed72b309c652e6be267d7c1007a3979205e401c10d4483ac891";
const wallet = new ethers_1.Wallet(privateKey);
const host = "https://clob.polymarket.com";
const timestamp = Math.floor(Date.now() / 1000).toString();
const nonce = Math.random().toString(36).substring(2, 15);
const message = `GET/auth/derive-api-key${timestamp}${nonce}`;
async function generateApiKeys() {
    try {
        const signature = await wallet.signMessage(message);
        const headers = {
            "POLY_ADDRESS": wallet.address,
            "POLY_TIMESTAMP": timestamp,
            "POLY_NONCE": nonce,
            "POLY_SIGNATURE": signature,
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        const response = await (0, node_fetch_1.default)(`${host}/auth/derive-api-key`, { headers });
        const data = await response.json();
        if (response.ok) {
            console.log("API Credentials:", data);
        }
        else {
            console.error("Error:", data);
        }
    }
    catch (error) {
        console.error("Request failed:", error instanceof Error ? error.message : String(error));
    }
}
generateApiKeys();
