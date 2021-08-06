export default function dropMenu(btnActivator){
    const d = document,
          $btnActivator = d.querySelector(btnActivator),
          $dropMenu = d.getElementById($btnActivator.dataset.target);
    d.addEventListener('click', e => {
        
        if(e.target.matches(`${btnActivator} *`)){            
            $dropMenu.classList.toggle('active');
        }
        else
            $dropMenu.classList.remove('active');

    })
}