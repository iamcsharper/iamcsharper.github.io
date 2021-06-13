import XandY from "@/shared/interfaces/XandY"
import { DirectiveOptions } from "vue"
import { DirectiveBinding } from "vue/types/options"

import { addEventListeners, removeEventListeners } from "../eventListeners";

const POINTER_START_EVENTS = ['mousedown', 'touchstart']
const POINTER_MOVE_EVENTS = ['mousemove', 'touchmove']
const POINTER_END_EVENTS = ['mouseup', 'touchend']

interface HTMLElementWithCoords extends HTMLElement {
    lastCoords: XandY;
    firstCoords: XandY;

    hasLast: boolean;
}

export interface DragData {
    el: HTMLElement;
    deltaX : number;
    deltaY: number;
    offsetX?: number;
    offsetY?: number;
    clientX: number;
    clientY: number;

    isDragging: boolean;
    hasMoved: boolean;
}

let draggedElem: HTMLElementWithCoords|null = null;
let customEl: HTMLElementWithCoords|null = null;
let _binding: DirectiveBinding|null = null;

function onPointerStart(evt: MouseEvent) {
    if (!customEl || !_binding)
        return;

    customEl.firstCoords = customEl.lastCoords = {
        x: evt.clientX,
        y: evt.clientY
    };
    customEl.hasLast = true;

    const data: DragData = {
        el: customEl,
        isDragging: true,
        hasMoved: false,
        clientX: evt.clientX,
        clientY: evt.clientY,
        deltaX: 0,
        deltaY: 0
    };

    _binding.value(data);
    
    draggedElem = customEl;
}

function onPointerEnd(evt: MouseEvent) {
    if (!customEl || !_binding)
        return

    if (customEl !== draggedElem)
        return
    evt.preventDefault()

    customEl.hasLast = false

    const data: DragData = {
        el: customEl,
        isDragging: false,
        hasMoved: false,
        clientX: evt.clientX,
        clientY: evt.clientY,
        deltaX: 0,
        deltaY: 0
    }

    _binding.value(data)

    draggedElem = null;
}
function onPointerMove(evt: MouseEvent) {
    if (!customEl || !_binding)
        return

    if (customEl !== draggedElem)
        return

    evt.preventDefault()

    if (customEl.hasLast) {
        const deltaX = evt.clientX - customEl.lastCoords.x
        const deltaY = evt.clientY - customEl.lastCoords.y
        const offsetX = evt.clientX - customEl.firstCoords.x
        const offsetY = evt.clientY - customEl.firstCoords.y
        const clientX = evt.clientX
        const clientY = evt.clientY

        const data: DragData = {
            el: customEl,
            hasMoved: true,
            deltaX,
            deltaY,
            offsetX,
            offsetY,
            clientX,
            clientY,
            isDragging: true,
        }

        _binding.value(data)

        customEl.lastCoords = {
            x: evt.clientX,
            y: evt.clientY
        }
        customEl.hasLast = true
    }
}

const vDragDirective: DirectiveOptions = {
    inserted: (el: HTMLElement, binding: DirectiveBinding) => {
        if (!document) return;
        
        customEl = el as HTMLElementWithCoords;
        _binding = binding;

        addEventListeners(el, POINTER_START_EVENTS, onPointerStart)
        addEventListeners(
            document.documentElement,
            POINTER_END_EVENTS,
            onPointerEnd
        )
        addEventListeners(
            document.documentElement,
            POINTER_MOVE_EVENTS,
            onPointerMove
        )

        console.log('v-drag registered all mouse handlers');
    },
    unbind: (el: HTMLElement) =>{
        removeEventListeners(el, POINTER_START_EVENTS, onPointerStart);
        removeEventListeners(document.documentElement, POINTER_END_EVENTS, onPointerEnd);
        removeEventListeners(document.documentElement, POINTER_MOVE_EVENTS, onPointerMove);

        console.log('v-drag disposed all mouse handlers');
    }
};

export default vDragDirective;