const SDK = globalThis.SDK;

export class MyCustomInstance extends SDK.IInstanceBase
{
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    public constructor(sdkType: SDK.ITypeBase, iInstance: SDK.IObjectInstance)
    {
        super(sdkType, iInstance);
    }

    public Release(): void { }
    public OnCreate(): void { }

    public OnPropertyChanged(id: string, value: EditorPropertyValueType): void { }

    public LoadC2Property(name: string, valueString: string): boolean { return false; }
}
