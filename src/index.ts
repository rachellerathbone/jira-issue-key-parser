import {issueKeyRegex} from './util/findIssueKeys';
import Logger from './config/logger';
import {MAX_CHARS_TO_PARSE} from './util/constants';

const logger = new Logger().getInstance();

const issueKeyParser = () => {
    return {
        parse: (text: string) => {
            if (typeof text !== 'string')
                logger.warn(`invalid value passed to parser`);

            return issueKeyRegex(text);
        },
        lastIndex: (text: string) => {
            return text.substring(0, MAX_CHARS_TO_PARSE);
        },
    };
};

export default issueKeyParser;
