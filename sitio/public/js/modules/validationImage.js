const d = document;

export const validationImage = (opt, cb) => {
  const $inputFile = d.getElementById(opt.inputFile),
        $files = $inputFile.files,
        accept = $inputFile.accept,
        limit = opt.limit * 1024 * 1024,
        fileMessage = opt.fileMessage,
        acceptMessage = opt.acceptMessage,
        limitMessage = opt.limitMessage,
        $targetMessage = d.querySelector(opt.targetMessage),
        $btnSubmit = d.querySelector(opt.btnSubmit);

    // Si existe un mensaje anterior lo elimino
    const beforeMessage = $targetMessage.querySelector('.text-warning');
    if(beforeMessage) $targetMessage.removeChild(beforeMessage)
     
    try {
      // Comprobando que exista al menos una imagen
      if(!$files.length) throw {message : fileMessage || "No se seleccionó ninguna imagen"}

      // Recorro cada imagen
      for(let i = 0; i < $files.length; i++){

        // Comprobando que las imagenes sean del tipo aceptado
        if(!accept.split(", ").includes($files[i].type))
          throw {message : acceptMessage || `Los formatos válidos de imagen son ${accept.replaceAll("image/","")}`}

        // Comprobando que las imagenes tengan el tamaño señalado
        if(!(limit >= $files[i].size))
          throw {message : limitMessage || `El tamaño máximo para la imagen es de ${limit / 1024 / 1024}MB`}
      }
      // Activo el boton
      $btnSubmit.disabled = false;
      cb && cb(true)
      
    } catch (error) {
      const $span = d.createElement('span');
      $span.classList.add('text-warning');
      $span.textContent = error.message;
      $targetMessage.appendChild($span);
      $btnSubmit.disabled = true;
      cb && cb(false)
    }
} 