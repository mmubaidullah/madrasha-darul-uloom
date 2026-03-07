// সিম্পল ইন-মেমরি ক্যাশ সিস্টেম
class SimpleCache {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map(); // Time to live
  }

  set(key, value, ttlMs = 5 * 60 * 1000) { // ডিফল্ট ৫ মিনিট
    this.cache.set(key, value);
    this.ttl.set(key, Date.now() + ttlMs);
  }

  get(key) {
    const expiry = this.ttl.get(key);
    if (!expiry || Date.now() > expiry) {
      this.cache.delete(key);
      this.ttl.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  has(key) {
    const expiry = this.ttl.get(key);
    if (!expiry || Date.now() > expiry) {
      this.cache.delete(key);
      this.ttl.delete(key);
      return false;
    }
    return this.cache.has(key);
  }

  delete(key) {
    this.cache.delete(key);
    this.ttl.delete(key);
  }

  clear() {
    this.cache.clear();
    this.ttl.clear();
  }

  // ক্যাশ সাইজ পরীক্ষা
  size() {
    return this.cache.size;
  }

  // এক্সপায়ার্ড এন্ট্রি পরিষ্কার করুন
  cleanup() {
    const now = Date.now();
    for (const [key, expiry] of this.ttl.entries()) {
      if (now > expiry) {
        this.cache.delete(key);
        this.ttl.delete(key);
      }
    }
  }
}

// গ্লোবাল ক্যাশ ইনস্ট্যান্স
const cache = new SimpleCache();

// অটো ক্লিনআপ - প্রতি ১০ মিনিটে
setInterval(() => {
  cache.cleanup();
}, 10 * 60 * 1000);

export default cache;