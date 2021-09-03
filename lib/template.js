export const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            color: red;
        }
    </style>
    <slot></slot>
`
