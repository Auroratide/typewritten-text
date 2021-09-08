import { NEXT_CHAR, PREV_CHAR } from './events.js'

export class TypewrittenTextMirror extends HTMLElement {
    static elementName = 'typewritten-text-mirror'

    constructor(mirrorOf) {
        super()

        this.mirrorOf = mirrorOf
    }

    connectedCallback() {
        this.setAttribute('aria-label', this.textContent)

        this.mirrorOf.addEventListener(NEXT_CHAR, (e) => {
            const i = e.detail.position
            const characters = this.querySelectorAll('.typewritten-text_character')

            if (i <= 0) {
                this.querySelector('.typewritten-text_start').classList.remove('typewritten-text_current')
            } else {
                characters[i - 1].classList.remove('typewritten-text_current')
            }

            characters[i].classList.add('typewritten-text_current', 'typewritten-text_revealed')
        })

        this.mirrorOf.addEventListener(PREV_CHAR, (e) => {
            const i = e.detail.position
            const characters = this.querySelectorAll('.typewritten-text_character')

            if (i <= 0) {
                this.querySelector('.typewritten-text_start').classList.add('typewritten-text_current')
            } else {
                characters[i - 1].classList.add('typewritten-text_current')
            }

            characters[i].classList.remove('typewritten-text_current', 'typewritten-text_revealed')
        })
    }
}
