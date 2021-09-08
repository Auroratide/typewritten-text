export const NEXT_CHAR = 'typewritten-text:nextchar'
export const nextCharEvent = (position) => new CustomEvent(NEXT_CHAR, {
    detail: { position }
})

export const PREV_CHAR = 'typewritten-text:prevchar'
export const prevCharEvent = (position) => new CustomEvent(PREV_CHAR, {
    detail: { position }
})

export const PHRASE_TYPED = 'typewritten-text:phrasetyped'
export const phraseTypedEvent = () => new CustomEvent(PHRASE_TYPED)

export const PHRASE_REMOVED = 'typewritten-text:phraseremoved'
export const phraseRemovedEvent = () => new CustomEvent(PHRASE_REMOVED)

export const STARTED = 'typewritten-text:started'
export const startedEvent = () => new CustomEvent(STARTED)

export const PAUSED = 'typewritten-text:paused'
export const pausedEvent = () => new CustomEvent(PAUSED)
