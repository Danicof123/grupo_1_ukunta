(function () {
    // Traigo las imagenes de la base de datos de la api
    const getImages = async () => {
        const response = await fetch('http://localhost:3000/api/carousel');

        const data = await response.json();
        return data;
    };
    // Inicio cantidad de imagenes en 0
    let imageAmount = 0;
    // Obtengo los elementos del DOM
    const carouselSlider = document.querySelector('.carousel-slider');
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const controlsPager = document.querySelector('.controls-pager');
    const carouseLoading = document.querySelector('.carousel-loading');
    // Botones del DOM
    const nextButton = document.querySelector('.go-next');
    const previousButton = document.querySelector('.go-previous');

    let carouselWidth = carouselContainer.clientWidth;
    let current = 0;

    // Renderizo las imagenes
    const renderImage = (img) => {
        // Creo un elemento imagen
        const imgElement = document.createElement('img');
        
        // Doy las propiedades a la imagen
        imgElement.src = `/images/${img.name}`;
        imgElement.className = 'carousel-image';
        imgElement.width = carouselWidth;

        // Agrego elementos hijos al slider del carrusel
        carouselSlider.appendChild(imgElement);
    };
    
    const renderPagerItem = (index) => {
        const pagerButton = document.createElement('button');

        pagerButton.classList.add('pager-button');
        pagerButton.setAttribute('data-id', index);

        if (index === 0) pagerButton.classList.add('active');

        controlsPager.appendChild(pagerButton);
    };

    const init = async () => {
        const images = await getImages();
        carouselWrapper.classList.remove('loading');
        carouseLoading.classList.remove('loading');
        imageAmount = images.length;

        carouselSlider.style.width = carouselWidth * images.length + 'px';

        images.forEach((img, index) => {
            renderImage(img);
            renderPagerItem(index);
        });
    };

    const windowResizeHandler = () => {
        carouselWidth = document.querySelector('.carousel-container').clientWidth;

        const imageElements = document.querySelectorAll('.carousel-image');
        imageElements.forEach((img) => (img.style.width = carouselWidth + 'px'));

        carouselSlider.style.width = carouselWidth * imageElements.length + 'px';

        recalculateSlider();
    };

    const recalculateSlider = () => {
        const offset = current * carouselWidth;
        carouselSlider.style.transform = `translate3d(-${offset}px, 0, 0)`;

        controlsPager.querySelector('button.active').classList.remove('active');
        controlsPager.querySelector(`button:nth-child(${current + 1})`).classList.add('active');
    };

    const nextHandler = () => {
        current = current + 1 > imageAmount - 1 ? 0 : current + 1;
        recalculateSlider();
    };

    const previousHandler = () => {
        current = current - 1 < 0 ? imageAmount - 1 : current - 1;
        recalculateSlider();
    };

    function controlsPagerHandler(e) {
        if (!e.target.classList.contains('pager-button')) return;

        current = parseInt(e.target.getAttribute('data-id'));
        recalculateSlider();
    }

    window.addEventListener('resize', windowResizeHandler);

    nextButton.addEventListener('click', nextHandler);
    previousButton.addEventListener('click', previousHandler);
    controlsPager.addEventListener('click', controlsPagerHandler);

    init();
})();
