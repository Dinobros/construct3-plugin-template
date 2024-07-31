import type { SingleGlobalInstance } from "./instance";

const C3 = globalThis.C3;

export class SingleGlobalType extends globalThis.ISDKObjectTypeBase<SingleGlobalInstance>
{
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    public constructor()
    {
        super();
    }

    public _onCreate(): void { }
}

C3.Plugins.Dinobros_Construct3PluginTemplate.Type = SingleGlobalType;
