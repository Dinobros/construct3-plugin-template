import type CustomC3Instance from "./instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Expression<T extends unknown[] = any[], R extends number | string = number | string>
    = (this: CustomC3Instance, ...args: T) => R;

const C3 = globalThis.C3;
const CustomC3Expressions: Record<string, Expression> = {
    Double(this: CustomC3Instance, num: number): number
    {
        return num * 2;
    }

};

C3.Plugins.Dinobros_Construct3PluginTemplate.Exps = CustomC3Expressions;

export default CustomC3Expressions;
