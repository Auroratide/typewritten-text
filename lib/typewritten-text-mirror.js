import { NEXT_CHAR } from './events.js'

export class TypewrittenTextMirror extends HTMLElement {
    static elementName = 'typewritten-text-mirror'

    constructor(mirrorOf) {
        super()

        this.mirrorOf = mirrorOf
    }

    connectedCallback() {
        this.mirrorOf.addEventListener(NEXT_CHAR, (e) => {
            this.querySelectorAll('.typewritten-text_character')[e.detail.position].classList.add('typewritten-text_revealed')
        })
    }
}
