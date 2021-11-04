const d = document;

const modal = (opt, cb) => {
  const $container = d.createElement('div'),
        $modal = d.createElement('div'),
        $title = d.createElement('h3'),
        $texto = d.createElement('p'),
        $comander = d.createElement('div'),
        $btnPrimary = d.createElement('button'),
        $btnSecondary = d.createElement('button');

  // Añadir clases
  $container.classList.add('modal-container');
  $modal.classList.add('modal-body');
  $title.classList.add('modal-title', 'bx', 'bx-error-circle');
  $comander.classList.add('modal-command');
  $btnPrimary.classList.add('btn', 'btn-primary', 'ghost', 'btn-modal', 'btn-modal-primary');
  $btnSecondary.classList.add('btn', 'btn-danger', 'ghost', 'btn-modal', 'btn-modal-secondary');

  // Construcción
  d.body.appendChild($container)
  $container.appendChild($modal);
  $modal.appendChild($title);
  $modal.appendChild($texto);
  $modal.appendChild($comander);
  $comander.appendChild($btnSecondary);
  $comander.appendChild($btnPrimary);
  d.documentElement.classList.add('no-scroll');

  // Contenido
  $texto.textContent = opt.message;
  $btnPrimary.textContent = opt.btnPrimary;
  $btnSecondary.textContent = opt.btnSecondary;

  d.addEventListener('click', e => {
    if(e.target === $btnPrimary){
      d.documentElement.classList.remove('no-scroll');
      d.body.removeChild($container)
      cb(true);
    }
    if(e.target === $btnSecondary || e.target === $container){
      d.documentElement.classList.remove('no-scroll');
      d.body.removeChild($container);
      cb(false);
    }
  })
}


export default modal;