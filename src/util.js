export const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
};