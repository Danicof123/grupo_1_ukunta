document.addEventListener('DOMContentLoaded', e => {
    const $msgalert = document.querySelector('.msg-alert');
    
    $msgalert.addEventListener('click', e => {
        $msgalert.classList.add('d-none')
    })
})