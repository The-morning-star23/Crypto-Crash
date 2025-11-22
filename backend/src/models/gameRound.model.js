// src/models/gameRound.model.js
const mongoose = require('mongoose');

// Sub-schema for bets
const betSchema = new mongoose.Schema({
  player_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bet_amount_usd: { type: Number, required: true },
  bet_amount_crypto: { type: Number, required: true },
  currency: { type: String, required: true, enum: ['BTC', 'ETH'] },
  cashout_multiplier: { type: Number, default: null },
  payout_crypto: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'cashed_out', 'crashed'], default: 'active' },
}, { _id: false });

const gameRoundSchema = new mongoose.Schema({
  crash_point: {
    type: Number,
    required: true,
  },
  provably_fair: {
    seed: { type: String, required: true },
    hash: { type: String, required: true },
  },
  bets: [betSchema],
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// This deletes data older than 3 days (259200 seconds)
gameRoundSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 });
// ------------------------------------------------------------------

const GameRound = mongoose.model('GameRound', gameRoundSchema);

module.exports = GameRound;