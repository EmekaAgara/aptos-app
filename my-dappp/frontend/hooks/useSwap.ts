// hooks/useSwap.ts
import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { tappClient, SUPPORTED_TOKENS, SwapQuote, SwapResult } from "@/utils/tappExchange";

export function useSwap() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getQuote = async (fromToken: any, toToken: any, fromAmount: string) => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setQuote(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const quoteResult = await tappClient.getQuote({
        fromToken: fromToken.address,
        toToken: toToken.address,
        amount: fromAmount,
        slippage: 0.5, // 0.5% default slippage
      });

      const swapQuote: SwapQuote = {
        fromToken,
        toToken,
        fromAmount,
        toAmount: quoteResult.expectedOutput,
        rate: parseFloat(quoteResult.rate),
        slippage: 0.5,
        minimumReceived: quoteResult.minimumOutput,
        priceImpact: quoteResult.priceImpact,
        gasEstimate: quoteResult.gasEstimate,
        route: quoteResult.route,
      };

      setQuote(swapQuote);
    } catch (err: any) {
      setError(err.message || "Failed to get quote");
      setQuote(null);
    } finally {
      setIsLoading(false);
    }
  };

  const executeSwap = async (): Promise<SwapResult> => {
    if (!quote || !account) {
      throw new Error("No quote or account available");
    }

    try {
      setIsLoading(true);
      setError(null);

      const swapParams = {
        fromToken: quote.fromToken.address,
        toToken: quote.toToken.address,
        amount: quote.fromAmount,
        slippage: quote.slippage,
        recipient: account.address.toString(),
      };

      // Get swap transaction payload
      const transactionPayload = await tappClient.getSwapTransaction(swapParams);

      // Sign and submit transaction using wallet
      const response = await signAndSubmitTransaction(transactionPayload);

      const swapResult: SwapResult = {
        hash: response.hash,
        status: "success",
        fromAmount: quote.fromAmount,
        toAmount: quote.toAmount,
        gasUsed: "0.002", // This would come from transaction receipt
      };

      return swapResult;
    } catch (err: any) {
      setError(err.message || "Swap failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    quote,
    isLoading,
    error,
    getQuote,
    executeSwap,
    supportedTokens: SUPPORTED_TOKENS,
  };
}
