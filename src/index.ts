import {issueKeyRegex} from './util/findIssueKeys';

export default class IssueKeyParser {
    str: string;

    constructor(str: string) {
        this.str = str;
    }

    parse() {
        return issueKeyRegex(this.str);
    }
}
