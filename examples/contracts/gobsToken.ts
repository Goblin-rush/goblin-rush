/**
 * Goblin Rush — $GOBS Token Interaction Example
 *
 * Shows how to read a player's GOBS balance on Base
 * and how the treasury sends GOBS to a player on claim.
 */

import { ethers } from "ethers";

const GOBS_CA   = "0x14539d3A8AC0017a086E8952870abB32ABF0E577";
const BASE_RPC  = "https://mainnet.base.org";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
];

/**
 * Read a player's on-chain GOBS balance.
 */
export async function getGobsBalance(walletAddress: string): Promise<string> {
  const provider = new ethers.JsonRpcProvider(BASE_RPC);
  const token    = new ethers.Contract(GOBS_CA, ERC20_ABI, provider);

  const [raw, decimals] = await Promise.all([
    token.balanceOf(walletAddress),
    token.decimals(),
  ]);

  return ethers.formatUnits(raw, decimals);
}

/**
 * Send GOBS from the treasury to a player on claim.
 * Called server-side only — requires TREASURY_PRIVATE_KEY.
 */
export async function sendGobsToPlayer(
  playerAddress: string,
  amount: number
): Promise<string> {
  const provider  = new ethers.JsonRpcProvider(BASE_RPC);
  const treasury  = new ethers.Wallet(process.env.TREASURY_PRIVATE_KEY!, provider);
  const token     = new ethers.Contract(GOBS_CA, ERC20_ABI, treasury);

  const decimals = await token.decimals();
  const rawAmount = ethers.parseUnits(amount.toString(), decimals);

  const tx = await token.transfer(playerAddress, rawAmount);
  await tx.wait(1);

  return tx.hash;
}

/**
 * Example usage:
 *
 * const balance = await getGobsBalance("0xYourWallet");
 * console.log("GOBS balance:", balance);
 */
