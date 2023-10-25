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
let category = '';
let searchQuery = '';


technologyCategoryBtn.addEventListener('click', () => {

    category = document.querySelector('#technology').value;
    fetchNews();

});

businessCategoryBtn.addEventListener('click', () => {

    category = document.querySelector('#business').value;
    fetchNews();
});

sportsCategoryBtn.addEventListener('click', () => {

    category = document.querySelector('#sports').value;
    fetchNews();
});

entertainmentCategoryBtn.addEventListener('click', () => {

    category = document.querySelector('#entertainment').value;
    fetchNews();
});

searchBtn.addEventListener('click', () => {
    searchQuery = document.querySelector('#searchInput').value;
    fetchSearchNews();

});


function fetchNews() {
    fetch(`https://newsapi.org/v2/top-headlines?category=${category}&country=${contry}&apiKey=${key}`)

        .then((resp) => resp.json())
        .then(data => {
            console.log(data);

            if (firstPage == 0) {
                document.querySelector('.news').textContent = '';


            }
            for (i = firstPage; i <= lastPage; i++) {

                const { urlToImage } = data.articles[i]
                let img = document.createElement('img');
                img.setAttribute('src', urlToImage);

                const { title } = data.articles[i]
                let h2 = document.createElement('h2');
                h2.textContent = title;


                const { url } = data.articles[i]
                let a = document.createElement('a');
                a.className = 'btnReadMore';
                a.href = url;
                a.innerHTML = 'Read more';

                let item = document.createElement('div');
                item.className = 'info_item'
                item.appendChild(img);
                item.appendChild(h2);
                item.appendChild(a);
                document.querySelector('.news').appendChild(item);

            }
        });
}
fetchNews();

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
            }


        });
}





