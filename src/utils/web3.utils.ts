export async function getChainInfo(chainId) {
  try {
    const response = await fetch(`https://chainid.network/chains.json`);
    const chains = await response.json();
    const chain = chains.find((chain) => chain.chainId === chainId);
    return chain;
  } catch (error) {
    return;
  }
}
