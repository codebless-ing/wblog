import { createLogger, transports, format } from "winston";
import config from "../../config.js";

const newLogger = function(entity = "", enableStack = true) {
	return createLogger({
		defaultMeta: { service: entity },
		transports: [
			new transports.File({
				level: 'debug',
				dirname: "./logs",
				filename: config.app.name + ".debug.log",
			}),
		],
		format: format.combine(
			format.errors({stack: enableStack}),
			format.colorize(),
			format.timestamp(),
			format.splat(),
			format.printf(({ timestamp, level, message, service, stack }) => {
				const log = service
					? `[${timestamp}] [${service}] ${level}: ${message}`
					: `[${timestamp}] ${level}: ${message} ${stack ?? ''}`;
					return stack ? log + '\n' + stack : log;
			}),
		),
	})
};

const consoleLogger = createLogger({
	transports: new transports.Console({
			level: 'debug'
		}),
	format: format.combine(
		format.errors({ stack: true }),
		format.colorize(),
		format.timestamp(),
		format.splat(),
		format.printf(({ timestamp, level, message, service }) => {
			const log = service
				? `[${timestamp}] [${service}] ${level}: ${message}`
				: `[${timestamp}] ${level}: ${message}`;
			return log;
		}),
	),
});


export { newLogger, consoleLogger };
