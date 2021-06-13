const addEventListeners = (el: HTMLElement, events: string[], handler: any):void => {
    for (let i = 0, len = events.length; i < len; i++) {
        el.addEventListener(events[i], handler)
    }
}

const removeEventListeners = (el: HTMLElement, events: string[], handler: any):void => {
    for (let i = 0, len = events.length; i < len; i++) {
        el.removeEventListener(events[i], handler)
    }
}

export {addEventListeners, removeEventListeners};