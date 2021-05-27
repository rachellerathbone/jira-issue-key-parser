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
        referenceLink: (text: string) => {
            const referenceRegex = /\[([A-Z]+-[0-9]+)\](?!\()/g;
            return referenceRegex.exec(text);
        },
    };
};

export default issueKeyParser;
