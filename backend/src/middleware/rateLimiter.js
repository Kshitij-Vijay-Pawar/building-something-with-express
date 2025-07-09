// import rateLimit from 'express-rate-limit';

// const rateLimiter = rateLimit({
//   windowMs: 20 * 1000, // 20s
//   max: 10,
//   message: '⚠️ Too many requests from this IP, please try again after 15 minutes.',
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// // Function to reset rate limit for a specific IP
// export function resetRateLimit(ip) {
//   if (rateLimiter.store && typeof rateLimiter.store.resetKey === 'function') {
//     rateLimiter.store.resetKey(ip);
//   }
// }

// export default rateLimiter;


import rateLimit from '../config/upstash.js'; // Adjust the import path as necessary

const rateLimiter = async(req, res, next) => {
  try {
    const {success} = await rateLimit.limit("mu-limit-key");
    if (!success) {
      return res.status(429).json({message: "Too many requests, please try again later."});
    }
    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;
