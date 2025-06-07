export function optimizeCommands(str: string): string {
    if (!str) return "";
    let count = 1;
    let result = "";
    for (let i = 1; i < str.length; i++) {
        if (str[i] === str[i - 1]) {
            count++;
        } else {
            result += (count > 1 ? count : "") + str[i - 1];
            count = 1;
        }
    }
    result += (count > 1 ? count : "") + str[str.length - 1];
    return result;
}
