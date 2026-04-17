"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrimString = TrimString;
exports.TrimToLowerCase = TrimToLowerCase;
exports.OptionalTrimString = OptionalTrimString;
exports.OptionalTrimToLowerCase = OptionalTrimToLowerCase;
const class_transformer_1 = require("class-transformer");
function normalizeString(value, options) {
    if (typeof value !== 'string') {
        return value;
    }
    const trimmed = value.trim();
    if (trimmed.length === 0 && options?.emptyAsUndefined) {
        return undefined;
    }
    return options?.lowercase ? trimmed.toLowerCase() : trimmed;
}
function TrimString() {
    return (0, class_transformer_1.Transform)(({ value }) => normalizeString(value));
}
function TrimToLowerCase() {
    return (0, class_transformer_1.Transform)(({ value }) => normalizeString(value, { lowercase: true }));
}
function OptionalTrimString() {
    return (0, class_transformer_1.Transform)(({ value }) => normalizeString(value, { emptyAsUndefined: true }));
}
function OptionalTrimToLowerCase() {
    return (0, class_transformer_1.Transform)(({ value }) => normalizeString(value, { lowercase: true, emptyAsUndefined: true }));
}
//# sourceMappingURL=normalized-string.transform.js.map