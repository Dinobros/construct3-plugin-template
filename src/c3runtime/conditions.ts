import type CustomC3Instance from "./instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Condition<T extends unknown[] = any[]> = (this: CustomC3Instance, ...args: T) => boolean;

const CustomC3Conditions = {
    IsLargeNumber(this: CustomC3Instance, num: number): boolean
    {
        return num > 100;
    }

} satisfies Record<string, Condition>;

export default CustomC3Conditions;
