/**
 * Goblin Rush — Goblin Agent Loop Example
 *
 * Shows the structure of the server-side agent that plays
 * the game on behalf of a player 24/7.
 *
 * The real implementation runs inside the API server
 * with a full game state engine. This is a simplified
 * representation of the loop structure.
 */

const WAVE_COUNT     = 10;
const WAVE_DURATION  = 30_000; // ms per wave
const BETWEEN_WAVES  = 5_000;  // ms between waves

interface AgentState {
  wallet: string;
  wave: number;
  kills: number;
  gobs: number;
  running: boolean;
}

/**
 * Simulates the agent game loop for one full run (10 waves).
 * After each wave, kills and GOBS are saved to the database.
 */
export async function runAgentSession(
  wallet: string,
  saveProgress: (wallet: string, kills: number, gobs: number, wave: number) => Promise<void>
): Promise<void> {
  const state: AgentState = {
    wallet,
    wave: 0,
    kills: 0,
    gobs: 0,
    running: true,
  };

  while (state.running && state.wave < WAVE_COUNT) {
    state.wave++;

    console.log(`[agent:${wallet.slice(0, 6)}] Wave ${state.wave} started`);

    const waveKills = await simulateWave(state.wave);
    const waveGobs  = calculateGobs(waveKills);

    state.kills += waveKills.total;
    state.gobs  += waveGobs;

    // Save after every wave — no earnings lost even if server restarts
    await saveProgress(wallet, state.kills, state.gobs, state.wave);

    console.log(
      `[agent:${wallet.slice(0, 6)}] Wave ${state.wave} done — ` +
      `kills: ${waveKills.total}, gobs earned: ${waveGobs}`
    );

    if (state.wave < WAVE_COUNT) {
      await sleep(BETWEEN_WAVES);
    }
  }

  console.log(`[agent:${wallet.slice(0, 6)}] Session complete — total gobs: ${state.gobs}`);
}

interface WaveResult {
  grunt: number;
  fast: number;
  tank: number;
  boss: number;
  total: number;
}

async function simulateWave(waveNumber: number): Promise<WaveResult> {
  await sleep(WAVE_DURATION);

  // Later waves have more tanky and boss enemies
  const grunt = 8 + waveNumber;
  const fast  = 3 + Math.floor(waveNumber / 2);
  const tank  = Math.floor(waveNumber / 3);
  const boss  = waveNumber >= 8 ? Math.floor((waveNumber - 7) * 1.5) : 0;

  return { grunt, fast, tank, boss, total: grunt + fast + tank + boss };
}

function calculateGobs(wave: WaveResult): number {
  return (
    wave.grunt * 1 +
    wave.fast  * 1 +
    wave.tank  * 3 +
    wave.boss  * 5
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
