document.querySelector('#main-demo .start').onclick = () => {
    document.querySelectorAll('#main-demo typewritten-text').forEach(elem => {
        elem.start()
    })
}