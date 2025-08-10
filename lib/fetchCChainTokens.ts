// Fetch all C-Chain compatible ERC20 tokens from CoinGecko (top 50 by market cap)
// Returns an array of { id, symbol, name, image }

interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

export async function fetchCChainTokens(): Promise<Array<{ id: string; symbol: string; name: string; image: string; address: string }>> {
  // Get top 50 Avalanche ecosystem tokens
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=avalanche-ecosystem&order=market_cap_desc&per_page=50&page=1";
  const res = await fetch(url);
  if (!res.ok) return [];
  const data: CoinMarket[] = await res.json();
  // For each token, fetch its contract address on Avalanche
  const tokens = await Promise.all(
    data.map(async (coin) => {
      let address = "";
      try {
        const detailRes = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}`);
        if (detailRes.ok) {
          const detail = await detailRes.json();
          address = detail.platforms?.avalanche || "";
        }
      } catch {
        // ignore
      }
      return {
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image,
        address,
      };
    })
  );
  return tokens;
}

// Fetch prices for a list of CoinGecko IDs
export async function fetchTokenPricesByIds(ids: string[]): Promise<Record<string, number>> {
  if (!ids.length) return {};
  const BATCH_SIZE = 30; // CoinGecko recommends <=50, use 30 for safety
  const result: Record<string, number> = {};
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${batch.join(",")}&vs_currencies=usd`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      for (const id of batch) {
        if (data[id] && data[id].usd) {
          result[id] = data[id].usd;
        }
      }
    } catch {
      // Ignore this batch, continue
    }
  }
  return result;
}
