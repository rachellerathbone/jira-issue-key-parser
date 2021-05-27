"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var findIssueKeys_1 = require("./util/findIssueKeys");
var logger_1 = __importDefault(require("./config/logger"));
var logger = new logger_1.default().getInstance();
var issueKeyParser = function () {
    return {
        parse: function (text) {
            logger.info("parsing: " + text);
            return findIssueKeys_1.issueKeyRegex(text);
        },
    };
};
exports.default = issueKeyParser;
