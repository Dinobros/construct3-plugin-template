import type CustomC3Instance from "./instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Expression<T extends unknown[] = any[], R extends number | string = number | string> =
    (this: CustomC3Instance, ...args: T) => R;

const CustomC3Expressions = {
    Double(this: CustomC3Instance, num: number): number
    {
        return num * 2;
    }

} satisfies Record<string, Expression>;

export default CustomC3Expressions;
