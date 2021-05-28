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
export declare const issueKeyRegex: (str: string) => string[] | null;
