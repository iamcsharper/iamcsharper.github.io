export enum Direction {
    Input = 'Input',
    Output = 'Output'
}

export enum IntMode {
    None = 'None',
    Int_Low = 'Int_Low',
    Int_High = 'Int_High',
    Int_Falling = 'Int_Falling',
    Int_Rising = 'Int_Rising',
    Int_Change = 'Int_Change',
    Event_Low = 'Event_Low',
    Event_High = 'Event_High',
    Event_Falling = 'Event_Falling',
    Event_Rising = 'Event_Rising',
    Event_Change = 'Event_Change'
}

export enum Line {
    None='None',
    Line_0='Line_0',
    Line_1='Line_1',
    Line_2='Line_2',
    Line_3='Line_3',
    Line_4='Line_4',
    Line_5='Line_5',
    Line_6='Line_6',
    Line_7='Line_7'
}

export interface GpioPinConfig {
    pin: number;
    num_in_port: number | null;
    name: string;
    direction: Direction;
    intMode: IntMode;
    line: Line;
}

export interface GpioPinConfigIndexed {
    data: Partial<GpioPinConfig>;
    index: number;
}

export interface GpioState {
    configs: GpioPinConfig[];
}


export enum GpioMutations {
    PUSH_CONFIG = 'PUSH_CONFIG',
    CHANGE_CONFIG_DATA = 'CHANGE_CONFIG_DATA',
    REMOVE_CONFIG = 'REMOVE_CONFIG'
}