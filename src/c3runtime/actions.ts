import type CustomC3Instance from "./instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T extends unknown[] = any[]> = (this: CustomC3Instance, ...args: T) => void;

const CustomC3Actions = {
    LogToConsole(this: CustomC3Instance): void
    {
        // eslint-disable-next-line no-console
        console.log("This is the 'Log to console' action. Test property = " + this.testProperty);
    }

} satisfies Record<string, Action>;

export default CustomC3Actions;
