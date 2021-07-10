import { Direction, GpioPinConfig, IntMode, Line } from "@/store/gpio/types";
import { ClockSource, CountMode } from "@/store/timer32/types";
import { AugmentedProjectState } from "@/store/types";

export type PinConfig = { port: number, pin: number, selectedMode: number };

const GPIODirectionCode: {
    [key in Direction]:string;
} = {
    [Direction.Input]: 'GPIO_DIR_INPUT',
    [Direction.Output]: 'GPIO_DIR_OUTPUT'
}

const TimerCountModeCode: {
    [key in CountMode]:string;
} = {
    [CountMode.Forward]: 'TIMER_COUNT_FORWARD',
    [CountMode.Reverse]: 'TIMER_COUNT_REVERSE',
    [CountMode.Bidirectional]: 'TIMER_COUNT_BIDIRECTIONAL'
}

const TimerSourceCode: {
    [key in ClockSource]:string;
} = {
    [ClockSource.Prescaler]: 'TIMER_SOURCE_PRESCALER',
    [ClockSource.TIM1]: 'TIMER_SOURCE_TIM1',
    [ClockSource.TIMEK_TX]: 'TIMER_SOURCE_TIMER_TX',
    [ClockSource.TIM2]: 'TIMER_SOURCE_TIM2'
}

export class CodeGen {
    mainContents: string;
    state: AugmentedProjectState;

    iter = 0;
    text = '';
    textLines: string[];

    userCodeEnable = true;

    TABS = '	';
    
    includeLines: string[] = [];
    prototypesLines: string[] = [];
    coreLines: string[] = [];
    peripheryLines: string[] = [];
    initLines: string[] = [];
    trapLines: string[] = [];
    
    constructor(mainContents: string, state: AugmentedProjectState) {
        this.mainContents = mainContents;
        this.textLines = mainContents.split(/\n/);

        this.state = state;
    }

    processCore():void {
        this.includeLines.push('#include <mcu_core.h>');

        if (this.state.pinout.some((elem) => elem.selectedMode !== null )) {
            this.prototypesLines.push('void PinFunction_Init();');
            this.coreLines.push(`${this.TABS}PinFunction_Init();`);

            this.initLines.push(
                '/* Core init functions ---------------------------------------------------- */',
                '',
                'void PinFunction_Init() {',
                `${this.TABS}/* Set pins functions ------------------------------------------------- */`
                );
            const pinConfig: PinConfig[] = this.state.pinout
                .filter(e => e.selectedMode !== null && e.selectedMode < 3)
                .map(e => ({
                    port: e.port || 0, 
                    pin: e.num_in_port || 0,
                    selectedMode: e.selectedMode || 0
                }));

            for (let port = 0; port < 3; port++) {
                for (let selectedMode = 0; selectedMode < 3; selectedMode++) {
                    const modePinConfig: PinConfig[] = pinConfig.filter((elem) => 
                        elem.port === port && elem.selectedMode === selectedMode
                    );
                    if (modePinConfig.length) {
                        const pins: string = modePinConfig
                            .map(e => e.pin)
                            .sort()
                            .map(e => `PIN_${e.toString()}`)
                            .join(' | ');
                        const line = `${this.TABS}setPinMaskFunction(GPIO_${port.toString()}, ${pins}, PIN_FUNCTION_${selectedMode.toString()});`;
                        this.initLines.push(line);
                    }
                }
            }
            this.initLines.push(
                '',
                ...this.userCodeLines("PinFunction_Init", 1),
                '}'
            );
        }
    }

    processGPIO():void {
        if (!this.state.gpio.configs.length) {
            return;
        }

        this.includeLines.push('#include <mcu_digital.h>');
        this.prototypesLines.push('void GPIO_Init();');
        this.peripheryLines.push(`${this.TABS}GPIO_Init();`);

        this.initLines.push(
            '',
            'void GPIO_Init() {',
            `${this.TABS}/* Set pins directions ------------------------------------------------ */`,
        );

        for (let port = 0; port < 3; port++) {
            for (const dir in Direction) {
                const pinsConfig:GpioPinConfig[] = this.state.gpio.configs
                    .filter(e => (
                        this.state.pinout[e.pin].port === port && 
                        e.direction === dir
                    ));

                if (pinsConfig.length) {
                    const pins:string = pinsConfig
                        .map(e => this.state.pinout[e.pin].num_in_port || 0)
                        .sort()
                        .map(e => `PIN_${e.toString()}`)
                        .join(' | ');

                    const line = [
                        this.TABS,
                        'GPIO_SetPinMaskDirection(GPIO_',
                        port,
                        ', ',
                        pins,
                        ', ',
                        GPIODirectionCode[dir as Direction],
                        ');'
                    ].join('');
                    this.initLines.push(line);
                }
            }
        }

        const intLinesConfig:GpioPinConfig[] = this.state.gpio.configs
            .filter(e => e.intMode !== IntMode.None)
            .sort((a, b) => parseInt(a.line.slice(-1)) - parseInt(b.line.slice(-1)));
        if (intLinesConfig.length) {
            this.initLines.push(
                `${this.TABS}/* Init interrupt lines ----------------------------------------------- */`
            );
            for (const intLine of intLinesConfig) {
                const line = [
                    'GPIO_InitInterruptLine(GPIO_LINE_',
                    intLine.line.slice(-1),
                    ', GPIO_MUX_',
                    intLine.line.toUpperCase(),
                    '_',
                    this.state.pinout[intLine.pin].port,
                    '_',
                    this.state.pinout[intLine.pin].num_in_port,
                    ', GPIO_MODE_',
                    intLine.intMode.toUpperCase(),
                    ');'
                ].join('');
                this.initLines.push(line);
            }
            if (
                this.state.gpio.configs.some(e => (
                    e.intMode == IntMode.Int_Low || 
                    e.intMode == IntMode.Int_High || 
                    e.intMode == IntMode.Int_Falling ||
                    e.intMode == IntMode.Int_Rising || 
                    e.intMode == IntMode.Int_Change 
                ))
            ) {
                this.initLines.push(
                    '',
                    `${this.TABS}enableInterrupts();`,
                    ''
                );

                this.prototypesLines.push('void GPIO_IRQ_TRAP_HANDLER();');
                this.trapLines.push(
                    '',
                    'void GPIO_IRQ_TRAP_HANDLER() {',
                    '',
                    ...this.userCodeLines("GPIO_IRQ_TRAP_HANDLER", 1),
                    '',
                    `${this.TABS}GPIO_ClearInterrupt();`,
                    '}'
                );
            }
        }

        this.initLines.push(
            ...this.userCodeLines("GPIO_Init", 1),
            '}'
        );
    }

    processTimer32():void {
        if (this.state.timer32.timers.some(e => e.isEnable)) {
            this.includeLines.push('#include <mcu_timer32.h>');
            this.prototypesLines.push('void Timer32_Init();');
            this.peripheryLines.push(`${this.TABS}Timer32_Init();`);

            this.initLines.push(
                '',
                'void Timer32_Init() {'
            );

            for (let i = 0; i < this.state.timer32.timers.length; i++) {
                if (this.state.timer32.timers[i].isEnable) {
                    const timer = this.state.timer32.timers[i];
                    const line = [
                        'void Timer_Init(TIMER32_',
                        i.toString(),
                        ', ',
                        timer.top,
                        ', ',
                        timer.prescaler,
                        ', ',
                        TimerCountModeCode[timer.countMode],
                        ', ',
                        TimerSourceCode[timer.clockSource],
                        ');'
                    ].join('');
                    this.initLines.push(line);
                }
            }

            this.initLines.push(
                ...this.userCodeLines("Timer32_Init", 1),
                '}'
            );

            this.initLines
        }
    }
    
    generate():void {
        this.processCore();
        this.processGPIO();
        this.processTimer32();

        this.copyLinesUntil('/* Includes --------------------------------------------------------------- */');
        this.addLines(this.includeLines);
        
        this.copyLinesUntil('/* Functions prototypes --------------------------------------------------- */');
        this.addLines(this.prototypesLines);

        this.copyLinesUntil(`${this.TABS}/* Core init ---------------------------------------------------------- */`);
        this.addLines(this.coreLines);

        this.copyLinesUntil(`${this.TABS}/* Periphery init ----------------------------------------------------- */`);
        this.addLines(this.peripheryLines);

        this.copyLinesUntil('/* Init functions --------------------------------------------------------- */');
        this.addLines(this.initLines);

        this.copyLinesUntil('/* Trap handlers ---------------------------------------------------------- */');
        this.addLines(this.trapLines);

        while (this.iter < this.textLines.length) {
            this.text = this.text.concat(this.textLines[this.iter++], '\n');
        }
        
        console.log(this.text);
    }
    
    copyLinesUntil(untilLine:string):void {
        while (this.textLines[this.iter] !== untilLine) {
            this.text = this.text.concat(this.textLines[this.iter++], '\n');
        }
        this.text = this.text.concat(this.textLines[this.iter++], '\n');
    }
    addLines(lines:string[]):void {
        for (const elem of lines) {
            this.text = this.text.concat(elem, '\n');
        }
    }

    userCodeLines(block:string, tabCount = 0):string[] {
        if (this.userCodeEnable) {
            return [
                `${this.TABS.repeat(tabCount)}/* USER CODE BEGIN ${block} */`,
                '',
                `${this.TABS.repeat(tabCount)}/* USER CODE END ${block} */`
            ];
        } else {
            return [];
        }
    }
}