import { NEXT_CHAR } from './events.js'

export class TypewrittenTextMirror extends HTMLElement {
    static elementName = 'typewritten-text-mirror'

    constructor(mirrorOf) {
        super()

        this.mirrorOf = mirrorOf
    }

    connectedCallback() {
        this.mirrorOf.addEventListener(NEXT_CHAR, (e) => {
            const i = e.detail.position
            const characters = this.querySelectorAll('.typewritten-text_character')

            if (i > 0) {
                characters[i - 1].classList.remove('typewritten-text_current')
            }

            characters[i].classList.add('typewritten-text_current', 'typewritten-text_revealed')
        })
    }
}
