const d = document;

export default function scrollObserver(){
  const $targetsObserver = d.querySelectorAll('*[data-observer]:not(a)');
  
  // Creación del observador
  const observer = new IntersectionObserver(entries => {
    // Comprobando las entradas
    entries.forEach(e => {
      // Cuando se intersecte, se busca el enlace vinculado y se le agrega clase active
      if(e.isIntersecting){      
       d.querySelectorAll(`a[data-observer][href="${d.location.pathname}#${e.target.id}"]`)
        .forEach(link => link.parentElement.classList.add('active'))
      }
      else
        d.querySelectorAll(`a[data-observer][href="${d.location.pathname}#${e.target.id}"]`)
        .forEach(link => link.parentElement.classList.remove('active'))
    })    
  }, {
    threshold: 0.49
  });
 
  // Añado el observador a los targets
  $targetsObserver.forEach(el => observer.observe(el));
}