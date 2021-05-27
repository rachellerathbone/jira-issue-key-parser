declare const issueKeyParser: () => {
    parse: (text: string) => string[] | null;
    lastIndex: (text: string) => string;
};
export default issueKeyParser;
