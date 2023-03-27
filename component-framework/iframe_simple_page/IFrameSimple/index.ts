import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class IFrameSimple implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _SiteIFrame: HTMLElement;
    private _container: HTMLDivElement;
    private _controlViewRendered: boolean;

    /**
     * Empty constructor.
     */
    constructor()
    {

    }


    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init (context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		this._container = container;
		this._controlViewRendered = false;
	}


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        if (!this._controlViewRendered) {
			this._controlViewRendered = true;
			this.renderIFrame();
		}
        // Build the entire URL with the user provided latitude and longitude
        if (context.parameters.Website_Link.raw == null)
        {
            const iFrameSrc = "https://www.buhlergroup.com/content/buhlergroup/global/de/homepage.html"
            // Update the IFrame to point to the updated URL
            this._SiteIFrame.setAttribute("src", iFrameSrc);
        }
        else
        {
            const iFrameSrc = context.parameters.Website_Link.raw;
            // Update the IFrame to point to the updated URL
            this._SiteIFrame.setAttribute("src", iFrameSrc);
        }
        
    }

    /** 
	 * Render IFrame HTML Element that hosts the Site and appends the IFrame to the control container 
	 */
	private renderIFrame(): void {
		this._SiteIFrame = this.createIFrameElement();
		this._container.appendChild(this._SiteIFrame);
	}   

	/** 
	 * Helper method to create an IFrame HTML Element
	 */
	private createIFrameElement(): HTMLElement {
		const iFrameElement: HTMLElement = document.createElement("iframe");
		iFrameElement.setAttribute("class", "SampleControl_IFrame");
		return iFrameElement;
	}

	

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
