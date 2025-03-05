import CustomSDKPlugin from "./plugin";
import CustomSDKInstance from "./instance";
import CustomSDKType from "./type";

const SDK = globalThis.SDK;

// eslint-disable-next-line camelcase
SDK.Plugins.Dinobros_Construct3PluginTemplate = CustomSDKPlugin;
SDK.Plugins.Dinobros_Construct3PluginTemplate.Instance = CustomSDKInstance;
SDK.Plugins.Dinobros_Construct3PluginTemplate.Type = CustomSDKType;

SDK.IPluginBase.Register(CustomSDKPlugin.ID, CustomSDKPlugin);
