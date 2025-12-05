/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */

export class MockSDKInstanceBase
{
    public constructor(_options?: { domComponentId?: string }) { }

    protected _getInitProperties(): unknown[] | null
    {
        return [42];
    }

    protected _release(): void { }

    protected _saveToJson(): unknown { return { }; }
    protected _loadFromJson(_o: unknown): void { }
}

declare global
{
    var ISDKInstanceBase: typeof MockSDKInstanceBase;
}

globalThis.ISDKInstanceBase = MockSDKInstanceBase;
