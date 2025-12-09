import { randomUUID } from "crypto";
export const createId = () => randomUUID();
export function requireField(body, field) {
    const value = body[field];
    if (typeof value !== "string" || !value.trim()) {
        throw new Error(`Field "${field}" is required and must be a non-empty string.`);
    }
    return value.trim();
}
export function parseOptionalDate(value, field) {
    if (value == null || value === "")
        return null;
    const s = String(value);
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) {
        throw new Error(`Field "${field}" must be a valid date string.`);
    }
    return d.toISOString();
}
export function getQueryParam(req, name) {
    const v = req.query[name];
    return typeof v === "string" && v !== "" ? v : undefined;
}
//# sourceMappingURL=utils.js.map