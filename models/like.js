const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
}, { timestamps: true });

// بنعمل "Unique Index" عشان المستخدم ميعملش لايك مرتين لنفس المنتج
likeSchema.index({ userId: 1, productId: 1 }, { unique: true });