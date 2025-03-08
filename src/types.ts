// Market listing response
export interface Market {
    yes: Token;
    no: Token;
    question: string;
  }
  
  export interface Token {
    token_id: string;
    outcome: 'Yes' | 'No';
    price: number;
    winner: boolean;
  }
  
  // Buy/Sell response
  export interface TradeResponse {
    success: boolean;
    errorMsg: string;
    orderID: string;
    transactionsHashes?: string[] | null;
    status?: string;
    market?: string;
    asset_id?: string;
    timestamp?: string;
    hash?: string;
    bids?: Order[];
    asks?: Order[];
  }
  
  export interface Order {
    price: string;
    size: string;
  }
  
  // Allowance response (simplified)
  export interface AllowanceResponse {
    type: number;
    chainId: number;
    nonce: number;
    hash: string;
    from: string;
    to: string;
    confirmations: number;
  }
  
  // Order book response
  export interface OrderItem {
    market: string;
    asset_id: string;
    bids: Order[];
    asks: Order[];
    hash: string;
  }
  
  // API keys response
  export interface ApiKeys {
    apiKey: string;
    secret: string;
    passphrase: string;
  }
  
  // Cancel orders response
  export interface CancelResponse {
    canceled: string[];
    not_canceled: Record<string, any>;
  }