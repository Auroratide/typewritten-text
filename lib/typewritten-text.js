import { template } from './template.js'

export class TypewrittenText extends HTMLElement {
    static elementName = 'typewritten-text'

    constructor() {
        super()

        this
            .attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }
}
