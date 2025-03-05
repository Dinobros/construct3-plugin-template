const SDK = globalThis.SDK;

export default class CustomSDKType extends SDK.ITypeBase
{
    public constructor(sdkPlugin: SDK.IPluginBase, iObjectType: SDK.IObjectType)
    {
        super(sdkPlugin, iObjectType);
    }
}
