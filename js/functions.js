const API_KEY = 'YZfBJcINwzLE6Fy7ISxAjUgR1Ou4RJfi';
const renderGifs = (gifs, container, search) => {
  let template = '';

  for (let gif of gifs) {
    let classs = 'gif';

    if (gif.images.original.width / gif.images.original.height >= 2) {
      classs = 'giflarge';
    } else {
      classs = 'gif';
    }
    template += ` 
   
        <div class="gifcontainer">
            <img class="${classs}" src="${gif.images.original.url}">      
            <footer class="giftext">
                <p>${getHashtags(gif, search)}</p>
            </footer>
        </div>
        `;
  }
  container.innerHTML = template;
};

let getHashtags = (gif, search) => {
  let hashtags = '';
  let slugArray = gif.slug.split('-');
  slugArray.pop();

  if (slugArray.length !== 0) {
    slugArray = slugArray.map((e) => `#${e}`);

    if (slugArray.length > 3) {
      slugArray.splice(2, slugArray.length - 1);
    }
    hashtags = slugArray.join(' ');
  } else {
    if (gif.title != '') {
      let title = gif.title.trim();
      title = title.substring(0, title.indexOf(' GIF'));
      hashtags = title
        .split(' ')
        .map((e) => `#${e}`)
        .join(' ');
    } else {
      hashtags = `#${search}`;
    }
  }
  return hashtags;
};

const searchGifs = (searchValue, container) => {
  fetch(
    'http://api.giphy.com/v1/gifs/search?q=' +
      `${searchValue}` +
      '&api_key=' +
      API_KEY +
      '&limit=16'
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res.data);

      if (container) {
        renderGifs(res.data, container, searchValue);
      } else {
        for (let gif of res.data) {
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const TENDENCIES_URL = 'https://api.giphy.com/v1/gifs/trending?&limit=16';
const getTendenciesGifs = (container) => {
  fetch(TENDENCIES_URL + '&api_key=' + API_KEY)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      renderGifs(res.data, container);
    })
    .catch((error) => {
      console.log(error);
    });
};

localStorage.removeItem('searchString');
let arrayString = [];
const saveSearchs = (search) => {
  if (localStorage.getItem('searchString') == null) {
    arrayString.push(search);
  } else {
    arrayString = localStorage.getItem('searchString').split(',');

    if (arrayString.length < 3) {
      arrayString.push(search);
    } else if (arrayString.length == 3) {
      arrayString.shift();
      arrayString.push(search);
    }
  }

  localStorage.setItem('searchString', arrayString.join());

  for (let i = 0; i < arrayString.length; i++) {
    let button = document.getElementById(`searchresult${i}`);
    button.childNodes[0].nodeValue = `${arrayString[i]}`;
    button.style.display = 'block';
  }
};

const getStream = async (video) => {
  let constraints = {
    audio: false,
    video: {
      height: { max: 480 },
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      console.log('entro al stream');
      video.srcObject = stream;
      video.play();
    })
    .catch(function (err) {
      console.log('no entro' + err);
    });
};

let recorder = null;
const funcionprueba = async (stream) => {
  recorder = new RecordRTCPromisesHandler(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function () {
      console.log('started');
    },
  });

  recorder.startRecording();
};
