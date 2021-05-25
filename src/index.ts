import {issueKeyRegex} from './util/findIssueKeys';

const issueKeyParser = () => {
    return {
        parse: (text: string) => {
            return issueKeyRegex(text);
        },
    };
};

export default issueKeyParser;
