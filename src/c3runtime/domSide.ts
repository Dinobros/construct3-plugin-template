class DomHandler extends DOMHandler
{
    public constructor(runtime: IRuntimeInterface)
    {
        super(runtime, "dinobros-construct3_plugin_template-dom_handler");
    }
}

RuntimeInterface.AddDOMHandlerClass(DomHandler);
