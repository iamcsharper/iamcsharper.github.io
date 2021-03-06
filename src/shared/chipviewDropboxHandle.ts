import { Store } from "@/store";
import { Direction, GpioMutations, GpioPinConfig, IntMode, Line } from "@/store/gpio/types";
import { Pin } from "@/store/types";

export function
chipviewDropboxHandle({ state, commit }: Store, pin: Pin, isActivated: boolean): void {
    const mode = pin.modes[pin.selectedMode || 0]

    let foundExisting:GpioPinConfig|null = null;

    const isGpio = mode.sign.startsWith('GPIO');

    for (const config of state.gpio.configs) {
        if (config.pin === pin.id) {
            foundExisting = config;
            break;
        }
    }

    if (!isGpio && foundExisting) {
        commit(GpioMutations.REMOVE_CONFIG, foundExisting.name);
    }

    if (isGpio)
    {
        console.log('we triggered a GPIO mode of pin',pin);

        const num = parseInt(mode.sign.replace('GPIO', '').split('_')[1], 10);
        const line = ('Line_' + (num % 8)) as Line;
       
        if (isActivated && !foundExisting) {
            commit(GpioMutations.PUSH_CONFIG, {
                pin: pin.id,
                num_in_port: pin.num_in_port,
                name: mode.sign,
                direction: Direction.Input,
                intMode: IntMode.None,
                line
            });
        }
    }
}