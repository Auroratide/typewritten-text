import { fixture, expect } from '@open-wc/testing'
import { NEXT_CHAR, PAUSED, PHRASE_REMOVED, PHRASE_TYPED, PREV_CHAR, STARTED } from './events.js'
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

    const words = (container) => [...container.querySelectorAll('.typewritten-text_word')]
        .map(elem => elem.textContent)

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

        it('containing emoji', async () => {
            // cannot use s.split('') since it splits emojis in half
            const container = await render(`
                <typewritten-text paused>🍎🍏</typewritten-text>
            `)

            expect(visibleText(container)).to.equal('')

            typewriter(container).typeNext()
            expect(visibleText(container)).to.equal('🍎')

            typewriter(container).typeNext()
            expect(visibleText(container)).to.equal('🍎🍏')
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

        it('resuming after it finishes', async () => {
            const container = await render(`
                <typewritten-text letter-interval="10">text</typewritten-text>
            `)

            await milliseconds(50)
            expect(visibleText(container)).to.equal('text')

            typewriter(container).start()
            await milliseconds(50)
            expect(visibleText(container)).to.equal('')
        })

        describe('unpausing', () => {
            it('with the start method', async () => {
                const container = await render(`
                    <typewritten-text paused letter-interval="10">hi</typewritten-text>
                `)

                typewriter(container).start()
                await milliseconds(30)

                expect(visibleText(container)).to.equal('hi')
            })

            it('with the paused property', async () => {
                const container = await render(`
                    <typewritten-text paused letter-interval="10">hi</typewritten-text>
                `)

                typewriter(container).paused = false
                await milliseconds(30)

                expect(visibleText(container)).to.equal('hi')
            })

            it('with the paused attribute', async () => {
                const container = await render(`
                    <typewritten-text paused letter-interval="10">hi</typewritten-text>
                `)

                typewriter(container).removeAttribute('paused')
                await milliseconds(30)

                expect(visibleText(container)).to.equal('hi')
            })
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

    /**
     * This suite of tests accomodates Chrome, which has wonky word-break
     * rules when a pseudo-element is on a span. See:
     * https://stackoverflow.com/questions/69121874/
     */
    describe('words', () => {
        it('empty', async () => {
            const container = await render(`
                <typewritten-text></typewritten-text>
            `)

            expect(words(container).length).to.equal(0)
        })

        it('single word', async () => {
            const container = await render(`
                <typewritten-text>one</typewritten-text>
            `)

            expect(words(container).length).to.equal(1)
            expect(words(container)[0]).to.equal('one')
        })

        it('basic text', async () => {
            const container = await render(`
                <typewritten-text>one two three</typewritten-text>
            `)

            expect(words(container).length).to.equal(3)
            expect(words(container)[1]).to.equal('two')
        })

        it('nested nodes', async () => {
            const container = await render(`
                <typewritten-text><span>hello</span> world</typewritten-text>
            `)

            expect(words(container).length).to.equal(2)
            expect(words(container)[0]).to.equal('hello')
            expect(words(container)[1]).to.equal('world')
        })
    })

    describe('cursor', () => {
        it('travels with the typing', async () => {
            const container = await render(`
                <typewritten-text paused>text</typewritten-text>
            `)

            typewriter(container).typeNext()
            expect(cursor(container)).to.equal('t')
            typewriter(container).typeNext()
            expect(cursor(container)).to.equal('e')
        })

        it('is at beginning and end', async () => {
            const container = await render(`
                <typewritten-text paused>hi</typewritten-text>
            `)

            expect(cursor(container)).to.equal('')
            typewriter(container).typeNext()
            typewriter(container).typeNext()
            expect(cursor(container)).to.equal('i')
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

    describe('events', () => {
        it('next char', async () => {
            const container = await render(`
                <typewritten-text paused>text</typewritten-text>
            `)

            let caught = false
            typewriter(container).addEventListener(NEXT_CHAR, () => {
                caught = true
            })

            typewriter(container).typeNext()

            expect(caught).to.be.true
        })

        it('prev char', async () => {
            const container = await render(`
                <typewritten-text paused>text</typewritten-text>
            `)

            let caught = false
            typewriter(container).addEventListener(PREV_CHAR, () => {
                caught = true
            })

            typewriter(container).typeNext()
            typewriter(container).backspace()

            expect(caught).to.be.true
        })

        it('phrase typed', async () => {
            const container = await render(`
                <typewritten-text paused>hi</typewritten-text>
            `)

            let caught = false
            typewriter(container).addEventListener(PHRASE_TYPED, () => {
                caught = true
            })

            typewriter(container).typeNext()
            expect(caught).to.be.false

            typewriter(container).typeNext()
            expect(caught).to.be.true
        })

        it('phrase removed', async () => {
            const container = await render(`
                <typewritten-text paused>hi</typewritten-text>
            `)

            let caught = false
            typewriter(container).addEventListener(PHRASE_REMOVED, () => {
                caught = true
            })

            typewriter(container).typeNext()
            typewriter(container).typeNext()
            typewriter(container).backspace()
            expect(caught).to.be.false

            typewriter(container).backspace()
            expect(caught).to.be.true
        })

        it('started', async () => {
            const container = await render(`
                <typewritten-text paused>hi</typewritten-text>
            `)

            let caught = false
            typewriter(container).addEventListener(STARTED, () => {
                caught = true
            })

            typewriter(container).start()
            expect(caught).to.be.true
        })

        it('paused', async () => {
            const container = await render(`
                <typewritten-text paused>hi</typewritten-text>
            `)

            let caught = false
            typewriter(container).addEventListener(PAUSED, () => {
                caught = true
            })

            typewriter(container).start()
            await rerender()
            typewriter(container).pause()
            expect(caught).to.be.true
        })
    })
})