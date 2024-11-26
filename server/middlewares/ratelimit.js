const setRateLimit = require("express-rate-limit");

const perMin = 3;

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({  
  windowMs: perMin * 60 * 1000,
  max: 1,
  message: (req) => {
    const remaining = Math.round(((req.rateLimit.resetTime - Date.now()) / 1000 / 60) * 10) / 10;
    return {error: `Rate Limited! Please try again in ${remaining} mins.`};
  },
  headers: true,
});

const rateLimitTime = (seconds) => setRateLimit({
  windowMs: seconds * 1000,
  max: 1,
  message: (req) => {
    const remaining = Math.round(((req.rateLimit.resetTime - Date.now()) / 1000 / 60) * 10) / 10;
    return {error: `Rate Limited! Please try again in ${remaining} mins.`};
  },
  headers: true,
});

module.exports = { rateLimitMiddleware, rateLimitTime };