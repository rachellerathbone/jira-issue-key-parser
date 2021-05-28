"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var colorizer = winston_1.default.format.colorize();
var logConfiguration = {
    transports: [new winston_1.default.transports.Console()],
    format: winston_1.default.format.combine(winston_1.default.format.label({
        label: "Label\uD83C\uDFF7\uFE0F",
    }), winston_1.default.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
    }), winston_1.default.format.printf(function (info) {
        return colorizer.colorize(info.level, info.level + ": " + info.label + ": " + [info.timestamp] + ": " + info.message);
    })),
};
var Singleton = /** @class */ (function () {
    function Singleton() {
        // * create a single instance of our logger so, if we ever build
        // * this library out and need to use the logger in more than one
        // * part of the app, we'll only ever have one logger instance
        if (!Singleton.instance) {
            Singleton.instance = winston_1.default.createLogger(logConfiguration);
        }
    }
    Singleton.prototype.getInstance = function () {
        return Singleton.instance;
    };
    return Singleton;
}());
exports.default = Singleton;
