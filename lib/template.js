export const template = document.createElement('template')
template.innerHTML = `
    <span hidden><slot></slot></span>
    <slot name="mirror"></slot>
`
