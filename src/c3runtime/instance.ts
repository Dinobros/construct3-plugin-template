export default class CustomC3Instance extends globalThis.ISDKInstanceBase
{
    protected _testProperty: number;

    public get testProperty() { return this._testProperty; }
    public set testProperty(value) { this._testProperty = value; }

    public constructor()
    {
        super({ domComponentId: "dinobros-construct3_plugin_template-dom_handler" });

        // Initialize object properties...
        this._testProperty = 0;

        const properties = this._getInitProperties();
        if (properties) // Note: properties may be null in some cases!
        {
            this._testProperty = properties[0] as number;
        }
    }

    public override _release(): void
    {
        super._release();
    }
    public override _saveToJson(): JSONValue
    {
        return { /* Data to be saved in savegames.. */ };
    }

    public override _loadFromJson(o: JSONValue): void
    {
        // Load state from savegames...
    }
}
