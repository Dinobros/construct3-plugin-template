import type CustomC3Instance from "./instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Condition<T extends unknown[] = any[]> = (this: CustomC3Instance, ...args: T) => boolean;

const C3 = globalThis.C3;
const CustomC3Conditions: Record<string, Condition> = {
    IsLargeNumber(this: CustomC3Instance, num: number): boolean
    {
        return num > 100;
    }
};

C3.Plugins.Dinobros_Construct3PluginTemplate.Cnds = CustomC3Conditions;

export default CustomC3Conditions;
