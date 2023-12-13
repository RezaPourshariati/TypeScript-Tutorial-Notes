"use strict";
class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
let pair = new KeyValuePair("1", "a");
function wrapInArray(value) {
    return [value];
}
let num = wrapInArray(1);
console.log(num);
//# sourceMappingURL=3-generics.js.map