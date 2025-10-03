// utils/tappExchange.ts
import { TappClient } from "@tapp-exchange/sdk";

// Initialize Tapp.Exchange client
export const tappClient = new TappClient({
  network: "mainnet", // or 'testnet' for testing
  // apiKey: 'your-api-key' // Optional if you have one
});

// Common tokens on Aptos
export const SUPPORTED_TOKENS: Token[] = [
  {
    address: "0x1::aptos_coin::AptosCoin",
    symbol: "APT",
    name: "Aptos Coin",
    decimals: 8,
    logoURI: "https://cryptologos.cc/logos/aptos-apt-logo.png",
  },
  {
    address: "0x1::coin::T<0x1::aptos_coin::AptosCoin>",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  {
    address: "0x1::coin::T<0x1::aptos_coin::AptosCoin>",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  {
    address: "0x1::coin::T<0x1::aptos_coin::AptosCoin>",
    symbol: "TAPP",
    name: "Tapp Token",
    decimals: 8,
    logoURI: "https://tapp.exchange/logo.png",
  },
];

export interface SwapQuote {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  rate: number;
  slippage: number;
  minimumReceived: string;
  priceImpact: number;
  gasEstimate: string;
  route: any[];
}

export interface SwapResult {
  hash: string;
  status: "success" | "failed";
  fromAmount: string;
  toAmount: string;
  gasUsed: string;
}
