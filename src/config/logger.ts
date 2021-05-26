import winston from 'winston';
const colorizer = winston.format.colorize();

const logConfiguration = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.label({
            label: `Label🏷️`,
        }),
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        winston.format.printf((info) =>
            colorizer.colorize(
                info.level,
                `${info.level}: ${info.label}: ${[info.timestamp]}: ${
                    info.message
                }`
            )
        )
    ),
};

class Singleton {
    static instance: winston.Logger;

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = winston.createLogger(logConfiguration);
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

export default Singleton;
