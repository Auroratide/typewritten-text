import { TypewrittenTextMirror } from './typewritten-text-mirror.js'
import { nextCharEvent, prevCharEvent } from './events.js'
import { template } from './template.js'

const FORWARD = 'forward'
const BACKWARD = 'backward'

export class TypewrittenText extends HTMLElement {
    static elementName = 'typewritten-text'
    static defaultLetterInterval = 100
    static defaultPhraseInterval = 1000

    constructor() {
        super()

        this
            .attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
        
        this.currentPosition = 0
        this.mirror = null
        this.direction = FORWARD
    }

    connectedCallback() {
        setTimeout(() => {
            if (!this.mirror) this.createMirror()

            this.parentNode.insertBefore(this.mirror, this)

            if (!this.paused) this.start()
        })
    }

    disconnectedCallback() {
        if (this.mirror)
            this.mirror.remove()
    }

    get letterInterval() {
        return parseInt(this.getAttribute('letter-interval')) || TypewrittenText.defaultLetterInterval
    }
    set letterInterval(value) {
        if (value === null) {
            this.removeAttribute('letter-interval')
        } else {
            this.setAttribute('letter-interval', value.toString())
        }
    }

    get phraseInterval() {
        return parseInt(this.getAttribute('phrase-interval')) || TypewrittenText.defaultPhraseInterval
    }
    set phraseInterval(value) {
        if (value === null) {
            this.removeAttribute('phrase-interval')
        } else {
            this.setAttribute('phrase-interval', value.toString())
        }
    }

    get paused() { return this.hasAttribute('paused') }
    set paused(value) {
        if (value) {
            this.setAttribute('paused', '')
        } else {
            this.removeAttribute('paused')
            setTimeout(this.tick, this.letterInterval)
        }
    }

    get repeat() { return this.hasAttribute('repeat') }
    set repeat(value) {
        if (value) {
            this.setAttribute('repeat', '')
        } else {
            this.removeAttribute('repeat')
        }
    }

    get length() {
        return this.mirror.querySelectorAll('.typewritten-text_character').length
    }

    typeNext = () => {
        if (this.currentPosition < this.length) {
            this.dispatchEvent(nextCharEvent(this.currentPosition))
            this.currentPosition += 1
        }
    }

    backspace = () => {
        if (this.currentPosition > 0) {
            this.currentPosition -= 1
            this.dispatchEvent(prevCharEvent(this.currentPosition))
        }
    }

    start = () => this.paused = false
    pause = () => this.paused = true

    tick = () => {
        if (this.paused)
            return

        const reversed = this.forceTick()

        setTimeout(this.tick, reversed ? this.phraseInterval : this.letterInterval)
    }

    reverse = () => {
        this.direction = this.direction === FORWARD ? BACKWARD : FORWARD
    }

    forceTick = () => {
        if (this.direction === FORWARD) {
            this.typeNext()
        } else {
            this.backspace()
        }

        const reversed = this.repeat && (this.currentPosition <= 0 || this.currentPosition >= this.length)

        if (reversed) {
            this.reverse()
        }

        return reversed
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

    createMirror = () => {
        this.mirror = new TypewrittenTextMirror(this)
        this.mirror.innerHTML = this.divideIntoCharacters()
    }
}
