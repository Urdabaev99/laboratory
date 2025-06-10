function optimazy(str: string): string {
    const result = [];
    let count = 1;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result.push((count === 1 ? "" : count) + str[i]);
            count = 1;
        }
    }
    return result.join("");
}

function createArrNumberString(str: string): string[] {
    const newArr = [];
    let numStr = "";
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        const code = ch.charCodeAt(0);
        if (code >= 48 && code <= 57) {
            numStr += ch;
        } else {
            newArr.push(numStr + ch);
            numStr = "";
        }
    }
    return newArr;
}

export function optimizeCommands(str: string): string {
    const optimazyStr = optimazy(str);
    const arr = createArrNumberString(optimazyStr);

    let compressed = "";
    const pattern = arr.join("");

    for (let i = 1; i <= pattern.length / 2; i++) {
        const subPattern = pattern.substring(0, i);
        const regex = new RegExp(`(?:${subPattern})+`, "g");
        const match = pattern.match(regex);

        if (match && match[0].length > subPattern.length) {
            const repeatCount = match[0].length / subPattern.length;
            compressed =
                repeatCount +
                "(" +
                subPattern +
                ")" +
                pattern.slice(match[0].length);
            return compressed;
        }
    }

    return pattern;
}
