import IssueKeyParser from '../src';

describe('IssueKeyParser', () => {
    describe('issue keys - branches', () => {
        it('extracts a single issue key from a branch - all uppercase', () => {
            const branchWithIssueKeyOnly = new IssueKeyParser('JRA-123');
            const branchWithIssueKeyAndText = new IssueKeyParser(
                'JRA-456-some-extra-text'
            );
            const branchWithTextAndIssueKey = new IssueKeyParser(
                'some-extra-text-JRA-789'
            );

            expect(branchWithIssueKeyOnly.parse()).toEqual(['JRA-123']);
            expect(branchWithIssueKeyAndText.parse()).toEqual(['JRA-456']);
            expect(branchWithTextAndIssueKey.parse()).toEqual(['JRA-789']);
        });

        it('extracts a single issue key from a branch - all lowercase', () => {
            const branchWithIssueKeyOnly = new IssueKeyParser('jra-123');
            const branchWithIssueKeyAndText = new IssueKeyParser(
                'jra-456-some-extra-text'
            );
            const branchWithTextAndIssueKey = new IssueKeyParser(
                'some-extra-text-jra-789'
            );

            expect(branchWithIssueKeyOnly.parse()).toEqual(['JRA-123']);
            expect(branchWithIssueKeyAndText.parse()).toEqual(['JRA-456']);
            expect(branchWithTextAndIssueKey.parse()).toEqual(['JRA-789']);
        });

        it('extracts a single issue key from a branch - uppercase and lowercase', () => {
            const branchWithIssueKeyOnly = new IssueKeyParser('jRa-123');
            const branchWithIssueKeyAndText = new IssueKeyParser(
                'Jra-456-some-extra-text'
            );
            const branchWithTextAndIssueKey = new IssueKeyParser(
                'some-extra-text-jrA-789'
            );

            expect(branchWithIssueKeyOnly.parse()).toEqual(['JRA-123']);
            expect(branchWithIssueKeyAndText.parse()).toEqual(['JRA-456']);
            expect(branchWithTextAndIssueKey.parse()).toEqual(['JRA-789']);
        });

        it('extracts multiple issue keys from a branch', () => {
            const branchWithIssueKeysOnly = new IssueKeyParser(
                'JRA-123-Jra-456'
            );
            const branchWithIssueKeysAndText = new IssueKeyParser(
                'jRa-123-JRA-456-my-branch'
            );
            const branchWithTextAndIssueKeys = new IssueKeyParser(
                'my-branch-JrA-123-JRa-456'
            );
            const textBetweenKeys = new IssueKeyParser(
                'JrA-123-my-branch-jra-456'
            );

            expect(branchWithIssueKeysOnly.parse()).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(branchWithIssueKeysAndText.parse()).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(branchWithTextAndIssueKeys.parse()).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(textBetweenKeys.parse()).toEqual(['JRA-123', 'JRA-456']);
        });

        it('extracts issue keys embedded in branch', () => {
            const branchWithOneIssueKey = new IssueKeyParser(
                'feature/JRA-123-my-feature'
            );
            const branchWithTwoIssueKeys = new IssueKeyParser(
                'feature/JRA-123-and-JRA-456'
            );

            expect(branchWithOneIssueKey.parse()).toEqual(['JRA-123']);
            expect(branchWithTwoIssueKeys.parse()).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
        });

        it('extracts alphanumeric issue key from a branch', () => {
            const branchWithNumericIssueKey = new IssueKeyParser(
                'feature/J3-123-my-feature'
            );

            expect(branchWithNumericIssueKey.parse()).toEqual(['J3-123']);
        });

        it('should not extract issue key when key leads with a number', () => {
            const branchWithNumericIssueKey = new IssueKeyParser(
                'feature/45-123-my-feature'
            );

            expect(branchWithNumericIssueKey.parse()).toEqual([]);
        });
    });

    describe('issue keys - commits and pull requests (title and body)', () => {
        it('extracts a single issue key from a commit message/pull request', () => {
            const messageWithIssueKeyOnly = new IssueKeyParser('JrA-123');
            const messageWithIssueKeyAndText = new IssueKeyParser(
                'JRa-456 some extra text'
            );
            const messageWithTextAndIssueKey = new IssueKeyParser(
                'some extra text jRA-789'
            );

            expect(messageWithIssueKeyOnly.parse()).toEqual(['JRA-123']);
            expect(messageWithIssueKeyAndText.parse()).toEqual(['JRA-456']);
            expect(messageWithTextAndIssueKey.parse()).toEqual(['JRA-789']);
        });

        it('extracts multiple issue keys from a commit message/pull request', () => {
            const messageWithIssueKeysOnly = new IssueKeyParser(
                'JRa-123 and JrA-456'
            );
            const messageWithIssueKeysAndText = new IssueKeyParser(
                'JRA-123 jRA-456 did some stuff'
            );
            const messageWithTextAndIssueKeys = new IssueKeyParser(
                'did some stuff here too for jrA-123 jra-456'
            );
            const textBetweenKeys = new IssueKeyParser(
                'JRA-123 changes that applied to JRA-456'
            );

            expect(messageWithIssueKeysOnly.parse()).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(messageWithIssueKeysAndText.parse()).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(messageWithTextAndIssueKeys.parse()).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
            expect(textBetweenKeys.parse()).toEqual(['JRA-123', 'JRA-456']);
        });

        it('extracts issue keys prefixed with a hash from a commit message/pull request', () => {
            const messageWithIssueKeysOnly = new IssueKeyParser(
                '#JRA-123 #Jra-456'
            );

            expect(messageWithIssueKeysOnly.parse()).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
        });

        it('extracts issue keys from brackets and parentheses from a commit message/pull request', () => {
            const messageWithIssueKeysOnly = new IssueKeyParser(
                'Making a commit with [JrA-123] and (jra-456)'
            );

            expect(messageWithIssueKeysOnly.parse()).toEqual([
                'JRA-123',
                'JRA-456',
            ]);
        });

        it('extracts alphanumeric issue key from a commit message/pull request', () => {
            const messageWithNumericIssueKey = new IssueKeyParser(
                'made some changes to j2-123'
            );

            expect(messageWithNumericIssueKey.parse()).toEqual(['J2-123']);
        });

        it('should not extract issue key when key leads with a number', () => {
            const messageWithNumericIssueKey = new IssueKeyParser(
                'my feature 22-123'
            );

            expect(messageWithNumericIssueKey.parse()).toEqual([]);
        });
    });
});
