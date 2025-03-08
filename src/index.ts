import { exec } from 'child_process';
import { promisify } from 'util';
import {
  Market,
  TradeResponse,
  AllowanceResponse,
  OrderItem,
  ApiKeys,
  CancelResponse,
} from './types';

const execPromise = promisify(exec);

export class PmarketWrapper {
  private cliPath: string;

  constructor(cliPath: string = 'pmarket-cli') {
    this.cliPath = cliPath;
  }

  // Helper to run commands and parse JSON output
  private async runCommand<T>(command: string): Promise<T> {
    try {
      const { stdout, stderr } = await execPromise(`${this.cliPath} ${command}`);
      if (stderr && !stdout) throw new Error(`CLI Error: ${stderr}`);
      return stdout ? JSON.parse(stdout.trim()) as T : {} as T;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Command "${command}" failed: ${errorMessage}`);
    }
  }

  // List markets with optional filter
  async listMarkets(filter: string = ''): Promise<Market[]> {
    return this.runCommand<Market[]>(`-l "${filter}"`);
  }

  // Buy tokens
  async buyToken(
    tokenId: string,
    amount: number,
    price: number
  ): Promise<TradeResponse> {
    return this.runCommand<TradeResponse>(`-b ${tokenId} ${amount} ${price}`);
  }

  // Sell tokens
  async sellToken(
    tokenId: string,
    amount: number,
    price: number
  ): Promise<TradeResponse> {
    return this.runCommand<TradeResponse>(`-s ${tokenId} ${amount} ${price}`);
  }

  // Set USDC allowance
  async setAllowance(amount: number): Promise<AllowanceResponse> {
    return this.runCommand<AllowanceResponse>(`-a ${amount}`);
  }

  // Show order Item for a token
  async getOrderItem(tokenId: string): Promise<OrderItem> {
    return this.runCommand<OrderItem>(`-o ${tokenId}`);
  }

  // Generate or get API keys
  async generateApiKeys(): Promise<ApiKeys> {
    return this.runCommand<ApiKeys>('-k');
  }

  // Cancel all open orders
  async cancelAllOrders(): Promise<CancelResponse> {
    return this.runCommand<CancelResponse>('-c');
  }
}

export default PmarketWrapper;