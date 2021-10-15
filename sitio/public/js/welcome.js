localStorage.getItem('mayorEdad') && (document.location.href = 'http://127.0.0.1:3000/home')

document.addEventListener('DOMContentLoaded', (event) => {
  document.addEventListener('click', e => {
    if(e.target.matches('.ctrl-label-button *')){
      localStorage.setItem('mayorEdad', true)
      document.location.href = 'http://127.0.0.1:3000/home';
    }
  })
})