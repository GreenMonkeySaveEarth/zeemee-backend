import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
interface RateLimitOptions {
	windowMs?: number;
	max?: number;
	message?: string;
}

function createRateLimitMiddleware(
	options: RateLimitOptions,
): RateLimitRequestHandler {
	const limiter = rateLimit({
		windowMs: options.windowMs || 60 * 1000, // 1 minute by default
		max: options.max || 100, // 100 requests per windowMs by default
		message: options.message || 'Too many requests, please try again later.',
		keyGenerator: (req) => req.ip || '1',
		handler: (_, res) => {
			// Customize the response for rate-limited requests
			res.status(429).json({
				message: 'Too many requests, please try again later.',
			});
		},
	});
	return limiter;
}

export { createRateLimitMiddleware };
