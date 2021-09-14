import { NEXT_CHAR, PREV_CHAR } from './events.js'

export class TypewrittenTextMirror extends HTMLElement {
    static elementName = 'typewritten-text-mirror'

    constructor(mirrorOf) {
        super()

        this.mirrorOf = mirrorOf
    }

    connectedCallback() {
        this.setAttribute('aria-label', this.textContent)

        this.mirrorOf.addEventListener(NEXT_CHAR, this.next)
        this.mirrorOf.addEventListener(PREV_CHAR, this.prev)
    }

    disconnectedCallback() {
        this.mirrorOf.removeEventListener(NEXT_CHAR, this.next)
        this.mirrorOf.removeEventListener(PREV_CHAR, this.prev)
    }

    type = (prevAction, curAction, e) => {
        const i = e.detail.position
        const characters = this.querySelectorAll('.typewritten-text_character')

        if (i <= 0) {
            this.querySelector('.typewritten-text_start').classList[prevAction]('typewritten-text_current')
        } else {
            characters[i - 1].classList[prevAction]('typewritten-text_current')
        }

        characters[i].classList[curAction]('typewritten-text_current', 'typewritten-text_revealed')
    }

    next = this.type.bind(this, 'remove', 'add')
    prev = this.type.bind(this, 'add', 'remove')
}
