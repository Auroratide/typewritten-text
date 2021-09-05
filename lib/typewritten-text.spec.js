import { fixture, html, expect } from '@open-wc/testing'
import './define.js'

describe('typewritten-text', () => {
    const typewriter = (container) => container.querySelector('typewritten-text')

    const visibleText = (container) => 
        [...container.querySelectorAll('.typewritten-text_revealed')]
            .map(e => e.textContent)
            .join('')

    it('using basic text', async () => {
        const container = await fixture(html`
            <div>
                <typewritten-text>example</typewritten-text>
            </div>
        `)
        await new Promise(resolve => setTimeout(resolve))

        expect(visibleText(container)).to.equal('')

        typewriter(container).typeNext()
        expect(visibleText(container)).to.equal('e')

        typewriter(container).typeNext()
        typewriter(container).typeNext()
        expect(visibleText(container)).to.equal('exa')
    })
})