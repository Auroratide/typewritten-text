import { fixture, expect } from '@open-wc/testing'
import './define.js'

describe('typewritten-text', () => {
    const typewriter = (container) => container.querySelector('typewritten-text')

    const visibleText = (container) => 
        [...container.querySelectorAll('.typewritten-text_revealed')]
            .map(e => e.textContent)
            .join('')
    
    const cursor = (container) => {
        const cursors = container.querySelectorAll('.typewritten-text_current')
        if (cursors.length > 1) {
            throw new Error('Cannot have multiple cursors')
        } else {
            return cursors[0].textContent
        }
    }

    const render = (code) => {
        return fixture(`<div>${code}</div>`)
            .then(container => new Promise(resolve => setTimeout(() => resolve(container))))
    }

    const milliseconds = (n) => new Promise(resolve => setTimeout(resolve, n))
    const rerender = () => milliseconds(0)

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

        it('backspacing', async () => {
            const container = await render(`
                <typewritten-text paused>text</typewritten-text>
            `)

            expect(visibleText(container)).to.equal('')

            typewriter(container).typeNext()
            typewriter(container).typeNext()
            expect(visibleText(container)).to.equal('te')

            typewriter(container).backspace()
            expect(visibleText(container)).to.equal('t')

            typewriter(container).backspace()
            expect(visibleText(container)).to.equal('')
            
            // attempting to backspace past the beginning
            typewriter(container).backspace()
            expect(visibleText(container)).to.equal('')
        })
    })

    describe('auto-typing', () => {
        it('basic text', async () => {
            const container = await render(`
                <typewritten-text letter-interval="10">text</typewritten-text>
            `)

            await milliseconds(50)

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

    describe('cursor', () => {
        it('travels with the typing', async () => {
            const container = await render(`
                <typewritten-text>text</typewritten-text>
            `)

            typewriter(container).typeNext()
            expect(cursor(container)).to.equal('t')
            typewriter(container).typeNext()
            expect(cursor(container)).to.equal('e')
        })
    })

    describe('repeat', () => {
        it('repeats', async () => {
            const container = await render(`
                <typewritten-text repeat paused>hi</typewritten-text>
            `)

            typewriter(container).forceTick()
            typewriter(container).forceTick()
            expect(visibleText(container)).to.equal('hi')

            typewriter(container).forceTick()
            expect(visibleText(container)).to.equal('h')

            typewriter(container).forceTick()
            expect(visibleText(container)).to.equal('')

            typewriter(container).forceTick()
            expect(visibleText(container)).to.equal('h')
        })
    })

    describe('dom manipulation', () => {
        it('removing and re-adding the node', async () => {
            const container = await render(`
                <typewritten-text paused>text</typewritten-text>
            `)

            const node = typewriter(container)

            node.typeNext()
            node.typeNext()
            node.remove()

            expect(visibleText(container)).to.equal('')

            // it remembers where it was
            container.appendChild(node)
            await rerender()
            expect(visibleText(container)).to.equal('te')
        })

        it('altering the children', async () => {
            const container = await render(`
                <typewritten-text paused>text</typewritten-text>
            `)

            typewriter(container).typeNext()
            typewriter(container).typeNext()

            typewriter(container).innerHTML = 'hello'
            
            // it starts over
            await rerender()
            expect(visibleText(container)).to.equal('')

            typewriter(container).typeNext()
            expect(visibleText(container)).to.equal('h')
        })
    })
})