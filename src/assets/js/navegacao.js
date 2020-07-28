(function () {
    function marcarLinkComoSelecionado(hash) {
        const links = document.querySelectorAll('[wm-link]')
        links.forEach( link => {
            link.classList.remove('selecionado')
        })

        const link = document.querySelector(`[wm-link="${hash}"]`)
        link.classList.add('selecionado')

    }

    function navegarViaAjax(hash) {
        if(!hash) return

        const link = document.querySelector(`[wm-link="${hash}"]`)
        const url = link.getAttribute('wm-link').substring(1)
        const destino = document.querySelector('[wm-link-destino]')

        fetch(url)
            .then(resp => resp.text())
            .then(html => {
                destino.innerHTML = html
                marcarLinkComoSelecionado(hash)
            })
    }

    function configurarLinks() {
        const links = document.querySelectorAll('[wm-link]')
        links.forEach( link => {
            link.href = link.getAttribute('wm-link')
        })
    }

    function navegacaoInicial() {
        if(location.hash){
            navegarViaAjax(location.hash)
        } else {
            const primeiroLink = document.querySelector('[wm-link]')
            navegarViaAjax(primeiroLink.hash)
        }
    }

    window.onhashchange = event => navegarViaAjax(location.hash)

    configurarLinks()
    navegacaoInicial()

})()