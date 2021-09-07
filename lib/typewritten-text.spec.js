import { fixture, expect } from '@open-wc/testing'
import './define.js'

describe('typewritten-text', () => {
    const typewriter = (container) => container.querySelector('typewritten-text')

    const visibleText = (container) => 
        [...container.querySelectorAll('.typewritten-text_revealed')]
            .map(e => e.textContent)
            .join('')

    const render = (code) => {
        return fixture(`<div>${code}</div>`)
            .then(container => new Promise(resolve => setTimeout(() => resolve(container))))
    }

    describe('manual typing', () => {
        it('basic text', async () => {
            const container = await render(`
                <typewritten-text paused>text</typewritten-text>
            `)

            expect(visibleText(container)).to.equal('')

            typewriter(container).typeNext()
            expect(visibleText(container)).to.equal('t')

            typewriter(container).typeNext()
            typewriter(container).typeNext()
            typewriter(container).typeNext()
            expect(visibleText(container)).to.equal('text')

            // attempting to type past the length of the text
            typewriter(container).typeNext()
            expect(visibleText(container)).to.equal('text')
        })
    })

    describe('length', () => {
        it('empty', async () => {
            const container = await render(`
                <typewritten-text></typewritten-text>
            `)

            expect(typewriter(container).length).to.equal(0)
        })

        it('basic text', async () => {
            const container = await render(`
                <typewritten-text>example</typewritten-text>
            `)

            expect(typewriter(container).length).to.equal(7)
        })

        it('nested nodes', async () => {
            const container = await render(`
                <typewritten-text><span>hello</span> world</typewritten-text>
            `)

            expect(typewriter(container).length).to.equal(11)
        })
    })
})