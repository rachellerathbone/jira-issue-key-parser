# Jira Issue Key Parser

Issue key parser is a simple library used to parse strings for Jira issue keys from commit messages, branches,
pull requests, pushes, and reference links.

This library accepts keys that follow these patterns:

-   JRA-123 (all uppercase)
-   jRA-123 (some uppercase, some lowercase - any order)
-   jra-123 (all lowercase - any order)
-   J2-123 (first part of key alphanumeric)
-   [JRA-123] (keys inside square brackets)
-   (JRA-123) (keys inside square brackets)
-   #JRA-123 (keys prefixed with hash)

Patterns that are not accepted:

-   22-123 (issue key starts with a number)
-   JRA 123 (missing hyphen from key)

### Usage

After installing and importing, simply call the `parse` method on `issueKeyParser` and pass in a string e.g `issueKeyParser().parse(JRA-123 my commit message)`.
