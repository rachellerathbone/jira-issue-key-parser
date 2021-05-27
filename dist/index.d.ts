declare const issueKeyParser: () => {
    parse: (text: string) => string[] | null;
    referenceLink: (text: string) => RegExpExecArray | null;
};
export default issueKeyParser;
