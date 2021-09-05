import { TypewrittenTextMirror } from './typewritten-text-mirror.js'
import { nextCharEvent } from './events.js'
import { template } from './template.js'

export class TypewrittenText extends HTMLElement {
    static elementName = 'typewritten-text'

    constructor() {
        super()

        this
            .attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
        
        this.currentPosition = 0
    }

    connectedCallback() {
        setTimeout(() => {
            const mirror = new TypewrittenTextMirror(this)
            mirror.innerHTML = this.innerHTML
            this.divideIntoCharacters(mirror)
            this.parentNode.insertBefore(mirror, this)
        })
    }

    typeNext = () => {
        this.dispatchEvent(nextCharEvent(this.currentPosition))
        this.currentPosition += 1
    }

    divideIntoCharacters = (node = this) => {
        if (node.children.length) {
            [...node.children].map(n => this.divideIntoCharacters(n)).join('')
        } else {
            node.innerHTML = node.textContent
                .split('')
                .map(ch => `<span class="typewritten-text_character">${ch}</span>`)
                .join('')
        }
    }
}
