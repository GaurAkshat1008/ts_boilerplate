import * as winston from "winston";

interface LoggerOptions {
  destination: {
    filename?: string;
    loki_host?: string;
    stdout?: boolean;
  };
}

class Logger {
  private _logger_instance: winston.Logger;

  constructor(options: LoggerOptions = { destination: { stdout: true } }) {
    const { destination } = options;
    const transports = [];
    const format = winston.format.combine(
      winston.format((info) => {
        info.level = info.level.toUpperCase();
        return info;
      })(),
      winston.format.colorize({
        level: true,
        colors: { info: "blue", warn: "yellow", error: "red", debug: "green" },
      }),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
      winston.format.printf(({ level, message, timestamp }) => {
        const formattedMessages = message
          .map(
            (msg: any, index: number) =>
              `${index}: ${
                typeof msg === "object" ? JSON.stringify(msg, null, 4) : msg
              }`
          )
          .join("\n");

        return `\n[\x1b[90m${timestamp}\x1b[0m] \t[${level}] ${formattedMessages}`;
      })
    );

    if (destination.loki_host) {
      transports.push(
        new winston.transports.Http({
          host: destination.loki_host,
        })
      );
    }

    if (destination.filename) {
      transports.push(
        new winston.transports.File({
          filename: destination.filename,
        })
      );
    }

    if (
      destination.stdout ||
      (!destination.loki_host && !destination.filename)
    ) {
      transports.push(new winston.transports.Console());
    }
    this._logger_instance = winston.createLogger({
      transports,
      format,
    });
  }

  info = (...msg: any[]) => {
    this._logger_instance.info(msg);
  };

  error = (...msg: any[]) => {
    this._logger_instance.error(msg);
  };

  warn = (...msg: any[]) => {
    this._logger_instance.warn(msg);
  };
  debug = (...msg: any[]) => {
    this._logger_instance.debug(msg);
  };
}

const logger = new Logger();

export default logger as Logger;
