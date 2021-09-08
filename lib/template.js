export const template = document.createElement('template')
template.innerHTML = `
    <style>
        #content {
            display: none;
        }
    </style>
    <span id="content"><slot></slot></span>
    <slot name="mirror"></slot>
`
