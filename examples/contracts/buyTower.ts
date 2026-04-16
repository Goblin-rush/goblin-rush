/**
 * Goblin Rush — Tower Purchase Example
 *
 * Shows how to send 0.01 ETH to the treasury wallet to purchase a tower.
 * The backend listens for the transaction, confirms it on-chain,
 * and records the tower to the player's inventory in the database.
 */

import { ethers } from "ethers";

const TREASURY = "0x757222CC8A81DCe53a91fed88a34833f3A6A48c7";
const TOWER_PRICE = ethers.parseEther("0.01");

export type TowerType = "archer" | "mage" | "sniper" | "cannon";

/**
 * Sends the tower purchase transaction on Base.
 * The `towerType` is encoded in the transaction data field
 * so the backend can identify which tower was bought.
 */
export async function buyTower(
  provider: ethers.BrowserProvider,
  towerType: TowerType
): Promise<string> {
  const signer = await provider.getSigner();

  const data = ethers.hexlify(ethers.toUtf8Bytes(`buy:${towerType}`));

  const tx = await signer.sendTransaction({
    to: TREASURY,
    value: TOWER_PRICE,
    data,
    chainId: 8453,
  });

  await tx.wait(1);

  return tx.hash;
}

/**
 * Example usage:
 *
 * const provider = new ethers.BrowserProvider(window.ethereum);
 * const txHash = await buyTower(provider, "archer");
 * console.log("Tower purchased:", txHash);
 */
