import {View} from "./lib.js";
import {Theater} from "./lib.js";

const theater = new Theater();

const view = new View(document.getElementById('root'), theater);

theater.getData(function(){

    if (window.location.search !== '') {
        const data = window.location.search.replace('?', '');
        const params = data.split('&');

        if (params[0] !== 'film' && params[0] !== 'trailer') {
            const id = window.location.search.replace('?', '');
            view.showFilmCard(id);
        }

        if (params[0] === 'film') {
            view.show(params[1], params[0]);
        }

        if (params[0] === 'trailer') {
            view.show(params[1], params[0]);
        }

    } else {
        view.init();
    }
},
    () => {
    view.root.innerHTML = `
                <p>Простите, сервер не отвечает.</p>
                <br />
                <p>Попробуйте зайти позже.</p>`;
}).then()

const feedbackBtn = document.getElementById('feedbackBtn');

function feedbackPopUp() {
    console.log('popup!');
    document.querySelector('.popup-bg').style.visibility = 'visible';
}

const feedbackForm = document.getElementById('feedbackForm');

feedbackBtn.addEventListener('click',()=>{
    feedbackPopUp();
})

const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click',(e)=>{
    // e.preventDefault();


    // const formData = new FormData(feedbackForm)
    // formData.append('currentUrl',window.location.href);
    //
    // var request = new XMLHttpRequest();
    // request.open("POST", "feedback.php");
    // request.send(formData);


    // feedbackForm.feedbackType.value = 0;
    // feedbackForm.feedbackMessage.value = "";
    // document.querySelector('.popup-bg').style.visibility = 'hidden'
})

const closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click',e=>{


    e.preventDefault();


    feedbackForm.feedbackType.value = 0;
    feedbackForm.feedbackMessage.value = "";
    document.querySelector('.popup-bg').style.visibility = 'hidden'
})