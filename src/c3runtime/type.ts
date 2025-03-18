import type CustomC3Instance from "./instance";

export default class CustomC3Type extends globalThis.ISDKObjectTypeBase<CustomC3Instance>
{
    public constructor()
    {
        super();
    }

    public override _onCreate(): void { /* ... */ }
}
