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
        this.mirror = null
    }

    connectedCallback() {
        setTimeout(() => {
            this.mirror = new TypewrittenTextMirror(this)
            this.mirror.innerHTML = this.divideIntoCharacters()
            this.parentNode.insertBefore(this.mirror, this)
        })
    }

    get length() {
        return this.mirror.querySelectorAll('.typewritten-text_character').length
    }

    typeNext = () => {
        this.dispatchEvent(nextCharEvent(this.currentPosition))
        this.currentPosition += 1
    }

    divideIntoCharacters = (node = this) => {
        return [...node.childNodes].map(n => {
            if (n.nodeType === Node.TEXT_NODE) {
                return n.textContent
                    .split('')
                    .map(ch => `<span class="typewritten-text_character">${ch}</span>`)
                    .join('')
            } else {
                const nn = n.cloneNode(false)
                nn.innerHTML = this.divideIntoCharacters(n)
                return nn.outerHTML
            }
        }).join('')
    }
}
