import mongoose from 'mongoose';
import crypto from 'crypto';

const giftCardSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true },
    design: { type: String, default: 'sage' },
    amount: { type: Number, required: true },
    balance: { type: Number },
    purchaser: { name: String, email: String },
    recipient: { name: String, email: String, message: String },
    status: { type: String, enum: ['active', 'redeemed', 'expired'], default: 'active' },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

// Auto-generate a friendly code + set balance + 12-month expiry
giftCardSchema.pre('validate', function (next) {
  if (!this.code) {
    this.code = 'SPA-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  }
  if (this.balance == null) this.balance = this.amount;
  if (!this.expiresAt) {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    this.expiresAt = d;
  }
  next();
});

export default mongoose.model('GiftCard', giftCardSchema);
