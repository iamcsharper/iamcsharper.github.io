
export enum CountMode {
    Forward = 'Forward',
    Reverse = 'Reverse',
    Bidirectional = 'Bidirectional',
}

export enum TimerIntMode {
    Interrupt = 'Interrupt',
    Event = 'Event',
}

export enum ClockSource {
    Prescaler = 'Prescaler',
    TIM1 = 'TIM1',
    TIMEK_TX = 'TIMEK_TX',
    TIM2 = 'TIM2',
}

export enum CHMode {
    Disable = 'Disable',
    Compare = 'Compare',
    Capture = 'Capture',
    PWM = 'PWM',
}

export enum CaptureEdge {
    Rising = 'Rising',
    Falling = 'Falling',
}

export interface TimerChannel {
    mode: CHMode;
    noiseFilter: boolean;
    compareValue: number;
    captureValue: number;
    captureEdge: CaptureEdge;
    pwmInverted: boolean;
}

export interface Timer {
    top: number;
    prescaler: number;
    countMode: CountMode;
    clockSource: ClockSource;
    channels: TimerChannel[];
    intMode: TimerIntMode;
    isEnable: boolean;
}

export type TimerIndexed = {
    data: Partial<Timer>,
    index: number;
}

export interface Timer32State {
    timers: Timer[],
}

export const timersCount = 3;