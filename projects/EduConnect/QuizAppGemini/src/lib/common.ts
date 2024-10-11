export function string_between_strings(startStr:string, endStr:string, str:string) {
    let pos = str.indexOf(startStr) + startStr.length;
    return str.substring(pos, str.indexOf(endStr, pos));
}