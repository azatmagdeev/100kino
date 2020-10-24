export class Film {
    constructor(
        id,
        name,
        altName,
        year,
        country,
        desc,
        genre
    ) {
        this.id = id
        this.name = name
        this.altName = altName
        this.year = year
        this.country = country
        this.desc = desc
        this.genre = genre
    }
}

export class Theater {
    constructor() {
        this.films = [];
    }

    async getData(success, fail) {
        const res = await fetch('../data.json');
        console.log(res);
        if (res.ok) {
            this.films = await res.json();
            console.log(this.films.length)
            console.log(this.films);
            await success();
        } else {
            fail()
        }
    }
}

export class View {
    constructor(root, theater) {
        this.root = root;
        this.theater = theater
    }

    init() {
        this.root.innerHTML = `
        <h1>Рекомендуем:</h1>
        <div id="desk"></div>`;
        this.theater.films.map(item => {
            document.getElementById('desk').innerHTML += `
            <div class="card">
                <a href="?${item.id}">
                    <img src="img/${item.id}.jpg" alt="">
                    <p id="${item.id}">${item.name}</p>
                </a>
            </div>`;
        })
    }

    showFilmCard(id) {
        console.log( this.theater.films.filter(item => Number(id) === item.id));
        const film = this.theater.films.filter(item => Number(id) === item.id)[0];
        console.log('film',film);
        !film.age ? film.age = '' : null;
        this.root.innerHTML = `
            <section class="one">
                <div class="image">
                    <img src="img/${id}.jpg" alt="">
                </div>
                <div class="section-one__title">
                    <h1>${film.name}</h1>
                    <h4 class="grey">${film.altName + ' ' + film.year}</h4>
                    <p class="grey">${film.country}</p>
                    <p class="grey">${film.genre}</p>
        
         <p>${film.age}</p>
        <a href="?trailer&${id}">
                        <button id="trailer">Смотреть трейлер</button>
                    </a>
                </div>
            </section>
            <section class="two">
                <p>${film.desc}</p>
                <a href="?film&${id}">
                    <button id="show">Смотреть фильм</button>
                </a>
            </section>`;
    }

    show(id, type) {

        const film = this.theater.films.filter(item => Number(id) === item.id)[0];
        this.root.innerHTML = `<div id="yohoho" data-title></div>`;
        const yohoho = document.getElementById('yohoho');

        if (type === 'trailer') {

            yohoho.setAttribute('data-player', 'trailer');

            if (!film.trailer || film.trailer === '') {
                yohoho.setAttribute('data-title', `${film.name} / ${film.altName} (${film.year})`)
            } else {
                document.querySelector('main').innerHTML = `
                       <iframe  src="${film.trailer}"
                       frameborder="0"
                       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                       allowfullscreen
                       style="width:100%;height:${window.innerHeight - 160}px"
                       ></iframe>`;
            }
        }

        if (type === 'film') {
            yohoho.setAttribute('data-kinopoisk', id)
        }

        const yo_scr = document.createElement('script');
        yo_scr.src = '//yohoho.cc/yo.js';
        document.body.appendChild(yo_scr);
    }
}