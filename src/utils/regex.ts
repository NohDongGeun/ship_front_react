export const containsKorean = (text: string) => {
    return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
};
