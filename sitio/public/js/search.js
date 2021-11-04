const d = document;

window.addEventListener('load', () => {
    const inputSearch = d.querySelector('.input-search');
    const search = d.querySelector('.formSearch');

    search.addEventListener('submit', (e) => {
        e.preventDefault();
        if (inputSearch.value.length > 0) {
            search.submit();
        }
    });
});

