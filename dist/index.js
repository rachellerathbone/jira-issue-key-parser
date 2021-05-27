"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var findIssueKeys_1 = require("./util/findIssueKeys");
var logger_1 = __importDefault(require("./config/logger"));
var constants_1 = require("./util/constants");
var logger = new logger_1.default().getInstance();
var issueKeyParser = function () {
    return {
        parse: function (text) {
            if (typeof text !== 'string')
                logger.warn("invalid value passed to parser");
            return findIssueKeys_1.issueKeyRegex(text);
        },
        lastIndex: function (text) {
            return text.substring(0, constants_1.MAX_CHARS_TO_PARSE);
        },
    };
};
exports.default = issueKeyParser;
