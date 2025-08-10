// Utility to fetch C-Chain (Avalanche) ERC20 token prices from CoinGecko
// Returns a map of symbol to price

export async function fetchCChainTokenPrices(symbols: string[]): Promise<Record<string, number>> {
  // CoinGecko API: https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2,usd-coin,binancecoin&vs_currencies=usd
  // Map symbols to CoinGecko IDs
  const symbolToId: Record<string, string> = {
    AVAX: "avalanche-2",
    USDC: "usd-coin",
    BNB: "binancecoin",
  };
  const ids = symbols.map((s) => symbolToId[s]).filter(Boolean).join(",");
  if (!ids) return {};
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
  const res = await fetch(url);
  if (!res.ok) return {};
  const data = await res.json();
  const result: Record<string, number> = {};
  for (const [symbol, id] of Object.entries(symbolToId)) {
    if (data[id] && data[id].usd) {
      result[symbol] = data[id].usd;
    }
  }
  return result;
}
