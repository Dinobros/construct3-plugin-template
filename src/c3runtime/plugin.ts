const C3 = globalThis.C3;

export class SingleGlobalPlugin extends globalThis.ISDKPluginBase
{
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    public constructor()
    {
        super();
    }
}

// eslint-disable-next-line camelcase
C3.Plugins.Dinobros_Construct3PluginTemplate = SingleGlobalPlugin;
