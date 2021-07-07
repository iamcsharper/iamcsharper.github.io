import { Store } from "@/store";
import { Direction, GpioMutations, GpioPinConfig, IntMode, Line } from "@/store/gpio/types";
import { AugmentedProjectState, Pin } from "@/store/types";

export function
chipviewDropboxHandle($store: Store, pin: Pin, isActivated: boolean): void {
    const mode = pin.modes[pin.selectedMode || 0]

    if (mode.sign.startsWith('GPIO'))
    {
        console.log('we triggered a GPIO mode of pin',pin);

        const line = 'Line_' + mode.sign.replace('GPIO', '').split('_')[1] as Line;

        const state = $store.state as AugmentedProjectState;
        let foundExisting:GpioPinConfig|null = null;

        for (const config of state.gpio.configs) {
            if (config.name === mode.sign) {
                foundExisting = config;
                break;
            }
        }

        if (!isActivated) {
            console.log('removing');
            if (foundExisting) {
                $store.commit(GpioMutations.REMOVE_CONFIG, foundExisting.name);
            }
        } else {
            if (!foundExisting) {
                $store.commit(GpioMutations.PUSH_CONFIG, {
                    name: mode.sign,
                    direction: Direction.Input,
                    intMode: IntMode.Event_Low,
                    line
                });
            }
        }
    }
}