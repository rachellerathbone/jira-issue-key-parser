declare const issueKeyParser: () => {
    parse: (text: string) => string[] | null;
};
export default issueKeyParser;
