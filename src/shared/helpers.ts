import introJs, {IntroJs} from "intro.js";

export const constrain = (min: number, max: number, a: number): number => {
    if (a < min) return min;
    if (a > max) return max;

    return a;
}

export const createIntro = (): IntroJs => {
    return introJs().setOptions({
        nextLabel: 'Далее',
        prevLabel: 'Назад',
        skipLabel: 'Пропустить',
        doneLabel: 'Готово',
        showProgress: true,
    });
}