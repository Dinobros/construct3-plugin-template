const SDK = globalThis.SDK;

export class MyCustomPluginType extends SDK.ITypeBase
{
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    public constructor(sdkPlugin: SDK.IPluginBase, iObjectType: SDK.IObjectType)
    {
        super(sdkPlugin, iObjectType);
    }
}
