const C3 = globalThis.C3;

export default class CustomC3Plugin extends globalThis.ISDKPluginBase
{
    public constructor()
    {
        super();
    }
}

// eslint-disable-next-line camelcase
C3.Plugins.Dinobros_Construct3PluginTemplate = CustomC3Plugin;
