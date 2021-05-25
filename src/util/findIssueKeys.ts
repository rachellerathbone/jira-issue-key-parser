/**
 * Parses strings for Jira issue keys for commit messages, branches,
 * pull requests, pushes, and reference links.
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

export const issueKeyRegex = (str: string) => {
    if (!str) return null;

    const issueKeyRegex = /[A-Za-z0-9]+-[0-9]+/g;
    const hasIssueKeys = str.match(issueKeyRegex);
    const isNumeric = /[0-9]+/g;

    const issueKeys =
        hasIssueKeys &&
        hasIssueKeys
            // Remove any keys that lead with a numeric value
            .filter((issue) => !issue.charAt(0).match(isNumeric))
            // Convert to uppercase so keys can be matched to Jira issues
            .map((issueKey) => issueKey.toUpperCase());

    return (issueKeys && issueKeys) || [];
};
