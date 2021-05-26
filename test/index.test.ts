import issueKeyParser from '../src';

describe('IssueKeyParser Suite', () => {
    describe('issue keys - branches', () => {
        it('extracts a single issue key from a branch - all uppercase', () => {
            const branchWithIssueKeyOnly = 'JRA-123';
            const branchWithIssueKeyAndText = 'JRA-456-some-extra-text';
            const branchWithTextAndIssueKey = 'some-extra-text-JRA-789';

            expect(issueKeyParser().parse(branchWithIssueKeyOnly)).toEqual([
                'JRA-123',
            ]);
            expect(issueKeyParser().parse(branchWithIssueKeyAndText)).toEqual([
                'JRA-456',
            ]);
            expect(issueKeyParser().parse(branchWithTextAndIssueKey)).toEqual([
                'JRA-789',
            ]);
        });

        it('extracts a single issue key from a branch - all lowercase', () => {
            const branchWithIssueKeyOnly = 'jra-123';
            const branchWithIssueKeyAndText = 'jra-456-some-extra-text';
            const branchWithTextAndIssueKey = 'some-extra-text-jra-789';

            expect(issueKeyParser().parse(branchWithIssueKeyOnly)).toEqual([
                'JRA-123',
            ]);
            expect(issueKeyParser().parse(branchWithIssueKeyAndText)).toEqual([
                'JRA-456',
            ]);
            expect(issueKeyParser().parse(branchWithTextAndIssueKey)).toEqual([
                'JRA-789',
            ]);
        });

        it('extracts a single issue key from a branch - uppercase and lowercase', () => {
            const branchWithIssueKeyOnly = 'jRa-123';
            const branchWithIssueKeyAndText = 'Jra-456-some-extra-text';
            const branchWithTextAndIssueKey = 'some-extra-text-jrA-789';

            expect(issueKeyParser().parse(branchWithIssueKeyOnly)).toEqual([
                'JRA-123',
            ]);
            expect(issueKeyParser().parse(branchWithIssueKeyAndText)).toEqual([
                'JRA-456',
            ]);
            expect(issueKeyParser().parse(branchWithTextAndIssueKey)).toEqual([
                'JRA-789',
            ]);
        });

        it('extracts multiple issue keys from a branch', () => {
            const branchWithIssueKeysOnly = 'JRA-123-Jra-456';
            const branchWithIssueKeysAndText = 'jRa-123-JRA-456-my-branch';
            const branchWithTextAndIssueKeys = 'my-branch-JrA-123-JRa-456';
            const textBetweenKeys = 'JrA-123-my-branch-jra-456';

            expect(issueKeyParser().parse(branchWithIssueKeysOnly)).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(issueKeyParser().parse(branchWithIssueKeysAndText)).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(issueKeyParser().parse(branchWithTextAndIssueKeys)).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(issueKeyParser().parse(textBetweenKeys)).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
        });

        it('extracts issue keys embedded in branch', () => {
            const branchWithOneIssueKey = 'feature/JRA-123-my-feature';

            const branchWithTwoIssueKeys = 'feature/JRA-123-and-JRA-456';

            expect(issueKeyParser().parse(branchWithOneIssueKey)).toEqual([
                'JRA-123',
            ]);
            expect(issueKeyParser().parse(branchWithTwoIssueKeys)).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
        });

        it('extracts alphanumeric issue key from a branch', () => {
            const branchWithNumericIssueKey = 'feature/J3-123-my-feature';

            expect(issueKeyParser().parse(branchWithNumericIssueKey)).toEqual([
                'J3-123',
            ]);
        });

        it('should not extract issue key when key leads with a number', () => {
            const branchWithNumericIssueKey = 'feature/45-123-my-feature';

            expect(issueKeyParser().parse(branchWithNumericIssueKey)).toEqual(
                []
            );
        });
    });

    describe('issue keys - commits and pull requests (title and body)', () => {
        it('extracts a single issue key from a commit message/pull request', () => {
            const messageWithIssueKeyOnly = 'JrA-123';
            const messageWithIssueKeyAndText = 'JRa-456 some extra text';
            const messageWithTextAndIssueKey = 'some extra text jRA-789';

            expect(issueKeyParser().parse(messageWithIssueKeyOnly)).toEqual([
                'JRA-123',
            ]);
            expect(issueKeyParser().parse(messageWithIssueKeyAndText)).toEqual([
                'JRA-456',
            ]);
            expect(issueKeyParser().parse(messageWithTextAndIssueKey)).toEqual([
                'JRA-789',
            ]);
        });

        it('extracts multiple issue keys from a commit message/pull request', () => {
            const messageWithIssueKeysOnly = 'JRa-123 and JrA-456';

            const messageWithIssueKeysAndText =
                'JRA-123 jRA-456 did some stuff';

            const messageWithTextAndIssueKeys =
                'did some stuff here too for jrA-123 jra-456';

            const textBetweenKeys = 'JRA-123 changes that applied to JRA-456';

            expect(issueKeyParser().parse(messageWithIssueKeysOnly)).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(issueKeyParser().parse(messageWithIssueKeysAndText)).toEqual(
                ['JRA-123', 'JRA-456']
            );
            expect(issueKeyParser().parse(messageWithTextAndIssueKeys)).toEqual(
                ['JRA-123', 'JRA-456']
            );
            expect(issueKeyParser().parse(textBetweenKeys)).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
        });

        it('extracts issue keys prefixed with a hash from a commit message/pull request', () => {
            const messageWithIssueKeysOnly = '#JRA-123 #Jra-456';

            expect(issueKeyParser().parse(messageWithIssueKeysOnly)).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
        });

        it('extracts issue keys from brackets and parentheses from a commit message/pull request', () => {
            const messageWithBracketsAndParens =
                'Making a commit with [JrA-123] and (jra-456)';

            const messageWithIssueKeysOnly = '[TEST-123] Test commit.';

            expect(
                issueKeyParser().parse(messageWithBracketsAndParens)
            ).toEqual(['JRA-123', 'JRA-456']);
            expect(issueKeyParser().parse(messageWithIssueKeysOnly)).toEqual([
                'TEST-123',
            ]);
        });

        it('extracts alphanumeric issue key from a commit message/pull request', () => {
            const messageWithNumericIssueKey = 'made some changes to j2-123';

            expect(issueKeyParser().parse(messageWithNumericIssueKey)).toEqual([
                'J2-123',
            ]);
        });

        it('should not extract issue key when key leads with a number', () => {
            const messageWithNumericIssueKey = 'my feature 22-123';

            expect(issueKeyParser().parse(messageWithNumericIssueKey)).toEqual(
                []
            );
        });
    });

    it('should handle incorrect types', () => {
        // @ts-ignore
        issueKeyParser().parse(2);
        issueKeyParser().parse('');
        // @ts-ignore
        issueKeyParser().parse([]);
        // @ts-ignore
        issueKeyParser().parse({});
        // @ts-ignore
        issueKeyParser().parse(null);
        // @ts-ignore
        issueKeyParser().parse(undefined);
    });
});
