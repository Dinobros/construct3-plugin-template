import type CustomC3Instance from "./instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T extends unknown[] = any[]> = (this: CustomC3Instance, ...args: T) => void;

const C3 = globalThis.C3;
const CustomC3Actions: Record<string, Action> = {
    LogToConsole(this: CustomC3Instance): void
    {
        // eslint-disable-next-line no-console
        console.log("This is the 'Log to console' action. Test property = " + this.testProperty);
    }
};

C3.Plugins.Dinobros_Construct3PluginTemplate.Acts = CustomC3Actions;

export default CustomC3Actions;
