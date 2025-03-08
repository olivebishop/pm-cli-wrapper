import { Wallet } from 'ethers';

const privateKey = "0xbbf404d172f62ed72b309c652e6be267d7c1007a3979205e401c10d4483ac891"; // Your private key
const wallet = new Wallet(privateKey);
const host = "https://clob.polymarket.com";
const timestamp = Math.floor(Date.now() / 1000).toString();
const nonce = "0";
const message = `GET/auth/derive-api-key${timestamp}${nonce}`;

async function generateApiKeys(): Promise<void> {
  try {
    const fetch = (await import('node-fetch')).default; // Dynamic import for ESM
    const signature = await wallet.signMessage(message);
    const headers: Record<string, string> = {
      "POLY_ADDRESS": wallet.address,
      "POLY_TIMESTAMP": timestamp,
      "POLY_NONCE": nonce,
      "POLY_SIGNATURE": signature,
      "Accept": "*/*",
      "Content-Type": "application/json"
    };

    const response = await fetch(`${host}/auth/derive-api-key`, { headers });
    const data = await response.json();

    if (response.ok) {
      console.log("API Credentials:", data);
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Request failed:", error instanceof Error ? error.message : String(error));
  }
}

generateApiKeys();