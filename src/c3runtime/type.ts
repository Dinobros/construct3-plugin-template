import type CustomC3Instance from "./instance";

const C3 = globalThis.C3;

export default class CustomC3Type extends globalThis.ISDKObjectTypeBase<CustomC3Instance>
{
    public constructor()
    {
        super();
    }

    public override _onCreate(): void { /* ... */ }
}

C3.Plugins.Dinobros_Construct3PluginTemplate.Type = CustomC3Type;
