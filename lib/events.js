export const NEXT_CHAR = 'typewritten-text:nextchar'

export const nextCharEvent = (position) => new CustomEvent(NEXT_CHAR, {
    detail: { position }
})

export const PREV_CHAR = 'typewritten-text:prevchar'

export const prevCharEvent = (position) => new CustomEvent(PREV_CHAR, {
    detail: { position }
})
