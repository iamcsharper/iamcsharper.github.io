import { DirectiveOptions } from "vue"
import { DirectiveBinding } from "vue/types/options"
import { addEventListeners, removeEventListeners } from "../eventListeners";

const POINTER_EVENTS = ['mousedown', 'touchstart']

let handler: DirectiveBinding | null = null;
let current: HTMLElement;

const onPointerEnd = ({
    target
}: MouseEvent) => {
    if (!handler) return;

    let targetElement = target as HTMLElement|null;
    
    do {
        if (targetElement == current) return;

        targetElement = targetElement ? targetElement.parentElement : null;
    } while (targetElement);

    handler.value();
}

const vClickDirective: DirectiveOptions = {
    inserted: (el: HTMLElement, binding: DirectiveBinding) => {
        if (!document) return;

        current = el;
        handler = binding;

        addEventListeners(
            document.documentElement,
            POINTER_EVENTS,
            onPointerEnd
        )
    },
    unbind: (_: HTMLElement) =>{
        removeEventListeners(document.documentElement, POINTER_EVENTS, onPointerEnd);
    }
};

export default vClickDirective;