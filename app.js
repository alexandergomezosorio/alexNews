let totNews = 17;
let lastPage = totNews;
let firstPage = 0;
const technologyCategoryBtn = document.querySelector('#technology');
const businessCategoryBtn = document.querySelector('#business');
const sportsCategoryBtn = document.querySelector('#sports');
const entertainmentCategoryBtn = document.querySelector('#entertainment');
const searchBtn = document.querySelector('#searchBtn');
const key = '49431b145b4f49a78aa8c53db14537e8';
const contry = 'us';
let category = 'general';
let searchQuery = '';

/* se da animacion al boton hamburguesa */
document.querySelector('.bars__menu').addEventListener('click', animateBars);
function animateBars() {
    const line2__bars = document.querySelector('.line2__bars-menu');
    const line1__bars = document.querySelector('.line1__bars-menu');
    const line3__bars = document.querySelector('.line3__bars-menu');

    line1__bars.classList.toggle('activeline1__bars-menu');
    line2__bars.classList.toggle('activeline2__bars-menu');
    line3__bars.classList.toggle('activeline3__bars-menu');
    document.querySelector('.nav__links').classList.toggle('nav__links-visible');
}

//Se da uso de botones con click para cambiar la category
technologyCategoryBtn.addEventListener('click', () => {

    category = document.querySelector('#technology').value;
    console.log(category);
    fetchNews();
    animateBars();
});

businessCategoryBtn.addEventListener('click', () => {

    category = document.querySelector('#business').value;
    fetchNews();
    animateBars();
});

sportsCategoryBtn.addEventListener('click', () => {

    category = document.querySelector('#sports').value;
    fetchNews();
    animateBars();
});

entertainmentCategoryBtn.addEventListener('click', () => {

    category = document.querySelector('#entertainment').value;
    fetchNews();
    animateBars();
});

/* searchBtn.addEventListener('click', () => {
    searchQuery = document.querySelector('#searchInput').value;
    if (searchQuery === '') {
        searchQuery = 'general'
        Swal.fire({
            title: 'Your search entry is empty',
            icon: 'error',
            color: 'red',
            width: '70%',
            timer: 2500,
            timerProgressBar: true,
            showCancelButton: false

        });
        searchQuery = category;
    }
    fetchSearchNews();

}); */
document.querySelector('#searchInput').addEventListener('input', () => {
    searchQuery = document.querySelector('#searchInput').value;
    if (searchQuery === '') {
        searchQuery = 'general';
    }
    fetchSearchNews();

})

//Se hace la peticion a la Api
function fetchNews() {
    fetch(`https://newsapi.org/v2/top-headlines?category=${category}&country=${contry}&apiKey=${key}`)

        .then((resp) => resp.json())
        .then(data => {
            console.log(data);

            if (firstPage == 0) {
                document.querySelector('.news').textContent = '';
            }

            for (i = firstPage; i <= lastPage; i++) {

                //crea la imagen
                const { urlToImage } = data.articles[i]
                let img = document.createElement('img');
                img.setAttribute('src', urlToImage);

                //Crea el titulo
                const { title } = data.articles[i];
                let h2 = document.createElement('h2');
                h2.textContent = title;

                //Se crea el boton para el link de la noticia

                const { url } = data.articles[i]
                let a = document.createElement('a');
                a.className = 'btnReadMore';
                a.href = url;
                a.innerHTML = 'Read more';

                //Creamos un div con todo lo de las noticias
                let item = document.createElement('div');
                item.className = 'info_item'
                item.appendChild(img);
                item.appendChild(h2);
                item.appendChild(a);
                document.querySelector('.news').appendChild(item);

            }
            /* let button = document.createElement('button');
             button.id = 'btnMoreNews';
             button.className = 'btnMoreNews';
             button.textContent = 'More news';
             document.querySelector('.news').appendChild(button);
 
             document.querySelector('#btnMoreNews').addEventListener('click', () => {
                 console.log('click');
                 
 
             }) */

        });
}
fetchNews();

//Se hace la peticion a la Api para el input search
function fetchSearchNews() {

    fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${key}`)
        .then((resp) => resp.json())
        .then(data => {


            if (firstPage == 0) {
                document.querySelector(".news").textContent = '';
            }
            if (data.status === 'ok') {

                for (i = firstPage; i <= lastPage; i++) {

                    const { urlToImage } = data.articles[i]
                    let img = document.createElement("img");
                    img.setAttribute("src", urlToImage);

                    const { title } = data.articles[i]
                    let h2 = document.createElement("h2");
                    h2.textContent = title;

                    const { url } = data.articles[i]
                    let a = document.createElement('a');
                    a.className = 'btnReadMore';
                    a.href = url;
                    a.innerHTML = 'Read more';

                    let item = document.createElement("div");
                    item.className = "info_item"
                    item.appendChild(img);
                    item.appendChild(h2);
                    item.appendChild(a);
                    document.querySelector('.news').appendChild(item);

                }

            } else {
                console.log(data.status, data.statusText);
                console.log('nada')
            }


        });
}





