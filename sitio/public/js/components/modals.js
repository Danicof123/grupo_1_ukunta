const d = document;

export const modal = (opt, cb) => {
  const $container = d.createElement('div'),
        $modal = d.createElement('div'),
        $title = d.createElement('h3'),
        $texto = d.createElement('p'),
        $comander = d.createElement('div'),
        $btnPrimary = d.createElement('button'),
        $btnSecondary = opt.btnSecondary && d.createElement('button');

  // Añadir clases
  $container.classList.add('modal-container');
  $modal.classList.add('modal-body');
  $title.classList.add('modal-title', 'bx', 'bx-error-circle');
  $comander.classList.add('modal-command');
  $btnPrimary.classList.add('btn', 'btn-primary', 'ghost', 'btn-modal', 'btn-modal-primary');
  opt.btnSecondary && $btnSecondary.classList.add('btn', 'btn-danger', 'ghost', 'btn-modal', 'btn-modal-secondary');

  // Construcción
  d.body.appendChild($container)
  $container.appendChild($modal);
  $modal.appendChild($title);
  $modal.appendChild($texto);
  $modal.appendChild($comander);
  opt.btnSecondary && $comander.appendChild($btnSecondary);
  $comander.appendChild($btnPrimary);
  d.documentElement.classList.add('no-scroll');

  // Contenido
  $texto.textContent = opt.message;
  $btnPrimary.textContent = opt.btnPrimary;
  if(opt.btnSecondary) $btnSecondary.textContent = opt.btnSecondary;

  d.addEventListener('click', e => {
    if(e.target === $btnPrimary){
      d.documentElement.classList.remove('no-scroll');
      d.body.removeChild($container)
      cb && cb(true);
    }
    if(($btnSecondary && e.target === $btnSecondary) || e.target === $container){
      d.documentElement.classList.remove('no-scroll');
      d.body.removeChild($container);
      cb && cb(false);
    }
  })
}

export const createAlert = (opt) => {
  const $alert = d.createElement('div');
  d.body.insertAdjacentElement("afterbegin", $alert);

  $alert.classList.add('alert',`alert-${opt.status}`,'active')
  $alert.textContent = opt.message;

  // Se oculta y se elimina al segundo
  setTimeout(() => {
    $alert.classList.contains('active') && $alert.classList.remove('active');
    setTimeout(() => {
      d.body.hasChildNodes($alert) && d.body.removeChild($alert);
    }, 1000)
  }, opt.time || 3 * 1000);

}
