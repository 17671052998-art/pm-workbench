// The design codec uses copying array methods that older browsers do not provide.
const copyingMethods = {
  toSorted(compareFn) {
    "use strict";
    if (compareFn !== undefined && typeof compareFn !== "function") throw new TypeError("Array comparator must be a function.");
    if (this == null) throw new TypeError("Cannot sort a null or undefined value.");
    return Array.from({ length: this.length }, (_, index) => this[index]).sort(compareFn);
  },
  toReversed() {
    "use strict";
    if (this == null) throw new TypeError("Cannot reverse a null or undefined value.");
    const result = Array.from({ length: this.length });
    for (let index = 0; index < result.length; index++) result[index] = this[result.length - index - 1];
    return result;
  },
};

for (const [name, value] of Object.entries(copyingMethods)) {
  if (typeof Array.prototype[name] !== "function") {
    Object.defineProperty(Array.prototype, name, { value, configurable: true, writable: true });
  }
}
