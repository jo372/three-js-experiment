import Settings from '../settings/Settings';
import './OptionsMenu.scss';

interface RangeOptions {
    min?: number | undefined;
    max?: number | undefined;
    step?: number | undefined;
}

interface RangeSliderOptions {
    id?: string | undefined;
    range?: RangeOptions | undefined;
    label?: LabelOptions | undefined;
    onInput?: (value: number) => void;
}

interface LabelOptions {
    text?: string | undefined;
    forId?: string | undefined;
}

class OptionsMenu {
    private _instance : OptionsMenu | null = null;
    private readonly _element : HTMLDivElement = this._createMenu();
    constructor() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = this;
    } 

    private _createLabel(config: Partial<LabelOptions>) : HTMLLabelElement {
        const element : HTMLLabelElement = document.createElement('label');
        element.innerText = config.text ? config.text : '';
        
        if(config.forId) element.setAttribute('for', config.forId);

        return element;
    }
 
    private _createRangeSlide(config : Partial<RangeSliderOptions>) : HTMLDivElement {
        
        const { id, range, onInput } = config;

        const parent = document.createElement('div');
        parent.classList.add('slide-container');


        const rangeSliderInput : HTMLInputElement = document.createElement('input');
        
        rangeSliderInput.type = 'range';
        rangeSliderInput.min = range?.min ? range.min.toString() : '0';
        rangeSliderInput.max = range?.max ? range.max.toString() : '100';
        rangeSliderInput.step = range?.step ? range.step.toString() : '1';
        rangeSliderInput.value = '0';
        rangeSliderInput.classList.add('range-slide');
        
        if(id) {
            rangeSliderInput.id = id;
        }
        
        if(onInput) {
            rangeSliderInput.addEventListener('input', (e: Event) => {
                const { target } = e;
                const strValue = (target as HTMLInputElement).value;
                onInput(parseFloat(strValue));
            });
        }
        const rangeSliderLabel = this._createLabel({
            text: config.label?.text ? config.label.text : '',
            forId: config.label?.forId ? config.label.forId : id
        });

        parent.append(rangeSliderLabel, rangeSliderInput);

        return parent;
    }

    private _createMenu() : HTMLDivElement {
        const element : HTMLDivElement = document.createElement('div');
        element.classList.add('options-menu');
        
        for(let i=0; i < 5; i++) {
            const rangeSlider = this._createRangeSlide({
                id: `range-slider-${i}`,
                range: {
                    min: 1,
                    max: 10,
                    step: 0.01
                },
                label: {
                    text: `Range slider ${i}`
                },
                onInput: (value: number) => {
                    Settings.MULTIPLIER = value;
                }
            });

            element.append(rangeSlider);
        }

        return element;
    }

    public get element() : HTMLDivElement {
        return this._element;
    }
}

export default OptionsMenu;