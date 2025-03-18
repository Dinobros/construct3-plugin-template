import CustomC3Instance from "./instance";
import CustomC3Plugin from "./plugin";
import CustomC3Type from "./type";
import CustomC3Actions from "./actions";
import CustomC3Conditions from "./conditions";
import CustomC3Expressions from "./expressions";

const C3 = globalThis.C3;

// eslint-disable-next-line camelcase
C3.Plugins.Dinobros_Construct3PluginTemplate = CustomC3Plugin;
C3.Plugins.Dinobros_Construct3PluginTemplate.Instance = CustomC3Instance;
C3.Plugins.Dinobros_Construct3PluginTemplate.Type = CustomC3Type;

C3.Plugins.Dinobros_Construct3PluginTemplate.Acts = CustomC3Actions;
C3.Plugins.Dinobros_Construct3PluginTemplate.Cnds = CustomC3Conditions;
C3.Plugins.Dinobros_Construct3PluginTemplate.Exps = CustomC3Expressions;
