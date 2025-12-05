import { describe, it, expect } from "vitest";

import CustomC3Conditions from "../src/c3runtime/conditions";
import CustomC3Instance from "../src/c3runtime/instance";

describe("CustomC3Conditions", () =>
{
    describe("IsLargeNumber", () =>
    {
        it("Should return true for numbers greater than 100", () =>
        {
            const instance = new CustomC3Instance();

            expect(CustomC3Conditions.IsLargeNumber.call(instance, 101)).toBe(true);
            expect(CustomC3Conditions.IsLargeNumber.call(instance, 200)).toBe(true);
        });
        it("Should return false for numbers less than or equal to 100", () =>
        {
            const instance = new CustomC3Instance();

            expect(CustomC3Conditions.IsLargeNumber.call(instance, 100)).toBe(false);
            expect(CustomC3Conditions.IsLargeNumber.call(instance, 50)).toBe(false);
            expect(CustomC3Conditions.IsLargeNumber.call(instance, 0)).toBe(false);
        });

        it("Should handle negative numbers", () =>
        {
            const instance = new CustomC3Instance();

            expect(CustomC3Conditions.IsLargeNumber.call(instance, -100)).toBe(false);
        });
    });
});
