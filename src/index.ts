import {issueKeyRegex} from './util/findIssueKeys';
import Logger from './config/logger';

const logger = new Logger().getInstance();

const issueKeyParser = () => {
    return {
        parse: (text: string) => {
            logger.info(`parsing: ${text}`);
            return issueKeyRegex(text);
        },
    };
};

export default issueKeyParser;
