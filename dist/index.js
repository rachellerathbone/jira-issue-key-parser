"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findIssueKeys_1 = require("./util/findIssueKeys");
const logger_1 = __importDefault(require("./config/logger"));
const logger = new logger_1.default().getInstance();
const issueKeyParser = () => {
    return {
        parse: (text) => {
            logger.info(`parsing: ${text}`);
            return findIssueKeys_1.issueKeyRegex(text);
        },
    };
};
exports.default = issueKeyParser;
//# sourceMappingURL=index.js.map