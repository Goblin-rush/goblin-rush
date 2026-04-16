/**
 * Goblin Rush — Client-Side Kill Tracking Example
 *
 * Shows how GOBS earnings are tracked during manual play
 * and saved to the server after each wave clears.
 *
 * Key rule: kills are held in memory during a wave.
 * They are flushed to the API only when the wave ends.
 * This prevents partial-wave saves from inflating counts.
 */

const API_BASE = "/api/game";

interface KillEvent {
  enemyType: "grunt" | "fast" | "tank" | "boss";
  timestamp: number;
}

interface SessionState {
  wallet: string;
  wave: number;
  sessionKills: number;
  sessionGobs: number;
  pendingKills: KillEvent[];
}

const GOBS_PER_KILL: Record<KillEvent["enemyType"], number> = {
  grunt: 1,
  fast:  1,
  tank:  3,
  boss:  5,
};

/**
 * Called in the game loop whenever a tower kills an enemy.
 * Adds to the in-memory pending kill buffer.
 */
export function onEnemyKilled(state: SessionState, type: KillEvent["enemyType"]): void {
  state.pendingKills.push({ enemyType: type, timestamp: Date.now() });
  state.sessionKills++;
  state.sessionGobs += GOBS_PER_KILL[type];
}

/**
 * Called when a wave fully clears.
 * Flushes pending kills to the API and saves progress.
 */
export async function onWaveComplete(state: SessionState): Promise<void> {
  if (state.sessionKills === 0) return;

  try {
    await recordKills(state.wallet, state.sessionKills, state.sessionGobs, state.wave);
    state.pendingKills = [];
    console.log(`Wave ${state.wave} saved — ${state.sessionKills} kills, ${state.sessionGobs} GOBS`);
  } catch (err) {
    console.error("Failed to save wave progress:", err);
  }
}

/**
 * Called on window beforeunload to catch any unsaved progress
 * if the player closes the tab mid-wave.
 */
export function onTabClose(state: SessionState): void {
  if (state.sessionKills > 0) {
    recordKills(state.wallet, state.sessionKills, state.sessionGobs, state.wave).catch(() => {});
  }
}

async function recordKills(
  wallet: string,
  kills: number,
  gobs: number,
  wave: number
): Promise<void> {
  await fetch(`${API_BASE}/record-kills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet, kills, gobs, wave }),
  });
}
