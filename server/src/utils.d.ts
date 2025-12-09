import type { Request } from "express";
export declare const createId: () => `${string}-${string}-${string}-${string}-${string}`;
export declare function requireField(body: any, field: string): string;
export declare function parseOptionalDate(value: unknown, field: string): string | null;
export declare function getQueryParam(req: Request, name: string): string | undefined;
//# sourceMappingURL=utils.d.ts.map