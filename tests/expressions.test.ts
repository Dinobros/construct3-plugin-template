import { describe, it, expect } from "vitest";

import CustomC3Expressions from "../src/c3runtime/expressions";
import CustomC3Instance from "../src/c3runtime/instance";

describe("CustomC3Expressions", () =>
{
    describe("Double", () =>
    {
        it("Should return double the input number", () =>
        {
            const instance = new CustomC3Instance();

            expect(CustomC3Expressions.Double.call(instance, 2)).toBe(4);
            expect(CustomC3Expressions.Double.call(instance, -3)).toBe(-6);
            expect(CustomC3Expressions.Double.call(instance, 0)).toBe(0);
            expect(CustomC3Expressions.Double.call(instance, 1.5)).toBe(3);
        });
    });
});
