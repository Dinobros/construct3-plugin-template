/* eslint-disable @typescript-eslint/no-empty-function */

import { describe, it, expect, vi } from "vitest";

import CustomC3Actions from "../src/c3runtime/actions";
import CustomC3Instance from "../src/c3runtime/instance";

describe("Actions", () =>
{
    describe("LogToConsole", () =>
    {
        it("Should log message with testProperty to console", () =>
        {
            const _consoleLog = vi.spyOn(console, "log")
                .mockImplementation(() => { });

            const instance = new CustomC3Instance();
            CustomC3Actions.LogToConsole.call(instance);

            expect(_consoleLog)
                .toHaveBeenCalledWith("This is the 'Log to console' action. Test property = 42");

            _consoleLog.mockRestore();
        });
    });
});

