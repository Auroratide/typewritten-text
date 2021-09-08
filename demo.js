const setupRun = (name) => {
    document.querySelector(`#${name} .start`).onclick = () => {
        document.querySelectorAll(`#${name} typewritten-text`).forEach(elem => {
            elem.start()
        })
    }
}

setupRun('main-demo')
setupRun('markdown-demo')
setupRun('interval-demo')

document.querySelector('#repeat-demo .toggle').onclick = () => {
    document.querySelectorAll(`#repeat-demo typewritten-text`).forEach(elem => {
        elem.paused = !elem.paused
    })
}
