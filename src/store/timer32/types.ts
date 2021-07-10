
export enum CountMode {
    Forward = 'Forward',
    Reverse = 'Reverse',
    Bidirectional = 'Bidirectional',
}

export enum ClockSource {
    Prescaler = 'Prescaler',
    TIM1 = 'TIM1',
    TIMEK_TX = 'TIMEK_TX',
    TIM2 = 'TIM2',
}

export enum CHMode {
    Disable,
    Compare,
    Capture,
    PWM,
}

export interface Timer {
    top: number;
    prescaler: number;
    countMode: CountMode,
    clockSource: ClockSource,
    ch1Mode: CHMode,

    isEnable: boolean,
}

export type TimerIndexed = {
    data: Partial<Timer>,
    index: number;
}

export interface Timer32State {
    timers: Timer[],
}

export const timersCount = 3;