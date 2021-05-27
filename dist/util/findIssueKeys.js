"use strict";
/**
 * Parses strings for Jira issue keys for commit messages,
 * branches, and pull requests.
 *
 * Accepted patterns:
 *      - JRA-123 (all uppercase)
 *      - jRA-123 (some uppercase, some lowercase - any order)
 *      - jra-123 (all lowercase - any order)
 *      - J2-123 (first part of key alphanumeric)
 *      - [JRA-123] (keys inside square brackets)
 *      - (JRA-123) (keys inside square brackets)
 *      - #JRA-123 (keys prefixed with hash)
 *
 * Not accepted:
 *      - 22-123 (issue key starts with a number)
 *      - JRA 123 (missing hyphen from key)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueKeyRegex = void 0;
var issueKeyRegex = function (str) {
    if (typeof str !== 'string')
        return null;
    var issueKeyRegex = /[A-Za-z0-9]+-[0-9]+/g;
    var hasIssueKeys = str.match(issueKeyRegex);
    var isNumeric = /[0-9]+/g;
    var issueKeys = hasIssueKeys &&
        hasIssueKeys
            // Remove any keys that lead with a numeric value
            .filter(function (issue) { return !issue.charAt(0).match(isNumeric); })
            // Convert to uppercase so keys can be matched to Jira issues
            .map(function (issueKey) { return issueKey.toUpperCase(); });
    return (issueKeys && issueKeys) || [];
};
exports.issueKeyRegex = issueKeyRegex;
