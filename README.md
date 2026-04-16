# GOBLIN RUSH

**On-chain tower defense on Base. Own your towers. Earn $GOBS from kills. Hire an AI agent to play for you 24/7.**

🎮 **Play:** [goblin-rush.xyz](https://goblin-rush.xyz)
🐦 **Follow:** [@goblinrush_](https://x.com/goblinrush_)
🔗 **Chain:** Base (ID 8453)

---

## What is Goblin Rush?

Goblin Rush is a tower defense game where everything is on-chain. You buy towers with ETH, earn $GOBS tokens from every goblin your towers kill, and optionally hire a Goblin Agent — an AI that plays the game server-side around the clock so your wallet earns while you sleep.

---

## How it Works

### 1. Buy a Tower (0.01 ETH)
Four tower types available: Archer, Mage, Sniper, Cannon. Each purchase is a Base transaction. You own the tower permanently.

### 2. Play and Earn $GOBS
Place towers on the map. Goblins come in waves. Every kill earns $GOBS:

| Goblin Type | Reward |
|-------------|--------|
| Grunt       | 1 GOBS |
| Fast        | 1 GOBS |
| Tank        | 3 GOBS |
| Boss        | 5 GOBS |

### 3. Upgrade Towers with $GOBS (Optional)
Upgrades burn $GOBS permanently. Three tiers available:

| Tier   | Cost (USD in GOBS) | Stat Boost          |
|--------|-------------------|---------------------|
| Tier 1 | $10               | Damage +30%, Range +15%, Fire rate +10% |
| Tier 2 | $20               | Damage +65%, Range +30%, Fire rate +25% |
| Tier 3 | $30               | Damage +120%, Range +50%, Fire rate +45% |

### 4. Hire a Goblin Agent (0.01 ETH, Optional)
The Goblin Agent runs the game server-side on your behalf. No browser needed. Earns $GOBS 24 hours a day, 7 days a week.

---

## $GOBS Token

```
Contract Address: 0x14539d3A8AC0017a086E8952870abB32ABF0E577
Chain: Base (ID 8453)
Decimals: 18
Total Supply: 100,000,000,000
```

[View on BaseScan](https://basescan.org/token/0x14539d3A8AC0017a086E8952870abB32ABF0E577)

---

## Reward Distribution

```
Gameplay  →  Player earns GOBS per kill
Player    →  Claims GOBS from treasury to wallet
Player    →  Burns GOBS on tower upgrades
Burns     →  Permanently reduce circulating supply
```

---

## Code Examples

See the [`/examples`](./examples) folder for code samples covering:

- Buying a tower via ethers.js
- Reading player GOBS balance on-chain
- How the Goblin Agent loop works
- Client-side kill tracking and wave save logic

---

## Tech Stack

- **Frontend:** React + Vite, Canvas API
- **Auth:** Privy (wallet login)
- **Chain:** Base via ethers.js
- **Backend:** Node.js + Fastify
- **DB:** PostgreSQL (Drizzle ORM)
- **Agent:** Server-side game loop

---

## Roadmap

| Phase | Status  | Scope |
|-------|---------|-------|
| 1     | Done    | Core gameplay, tower purchases, GOBS earnings, leaderboard |
| 2     | Live    | Goblin Agent, tower upgrades, GOBS claim, dashboard |
| 3     | Soon    | New goblin types, more map slots, agent replays |
| 4     | Planned | Multiple maps, co-op mode, guild system, seasonal competitions |

---

## Links

- Game: [goblin-rush.xyz](https://goblin-rush.xyz)
- X: [@goblinrush_](https://x.com/goblinrush_)
- Token: [BaseScan](https://basescan.org/token/0x14539d3A8AC0017a086E8952870abB32ABF0E577)

---

> This repository contains code examples and documentation only. The full game source is closed source.
