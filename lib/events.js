export const NEXT_CHAR = 'typewritten-text:nextchar'

export const nextCharEvent = (position) => new CustomEvent(NEXT_CHAR, {
    detail: { position }
})
