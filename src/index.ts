import {issueKeyRegex} from './util/findIssueKeys';
import Logger from './config/logger';

const logger = new Logger().getInstance();

const issueKeyParser = () => {
    return {
        parse: (text: string) => {
            if (typeof text !== 'string')
                logger.warn(`invalid value passed to parser`);

            return issueKeyRegex(text);
        },
    };
};

export default issueKeyParser;
