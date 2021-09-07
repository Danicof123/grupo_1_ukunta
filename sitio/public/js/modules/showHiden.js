const d = document;

const editInput = (btn) => {
    d.addEventListener('click', e => {
        if(e.target.matches(`${btn} *`)){
            const $target = e.target.parentNode.dataset.target;
            const $changeTarget = d.getElementById($target)
            //Hago visible el bloque
            $changeTarget.classList.add('active')
            // Obtengo todos los inputs y los habilito
            $changeTarget.querySelectorAll('input').forEach(i => i.disabled = false)
            // Obtengo todos los label y los hago visibles
            $changeTarget.querySelectorAll('label').forEach(l => l.classList.remove('d-none'))
        }

    })
}


export {
    editInput,
}