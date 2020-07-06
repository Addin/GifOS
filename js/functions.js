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
      if (search) {
        hashtags = `#${search}`;
      }
    }
  }
  return hashtags;
};

const searchGifs = (searchValue, container) => {
  fetch(
    'https://api.giphy.com/v1/gifs/search?q=' +
      `${searchValue}` +
      '&api_key=' +
      API_KEY +
      '&limit=16'
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      renderGifs(res.data, container);
    })
    .catch((error) => {
      console.log(error);
    });
};

const searchCategoryGifs = (searchValue, img) => {
  fetch(
    'https://api.giphy.com/v1/gifs/search?q=' +
      `${searchValue}` +
      '&api_key=' +
      API_KEY +
      '&limit=1'
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      img.src = res.data[0].images.original.url;
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

let stream = null;

const getStream = async (video) => {
  let constraints = {
    audio: false,
    video: {
      height: 400,
      width: 750,
    },
  };

  stream = navigator.mediaDevices
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

const recordGif = async (stream) => {
  recorder = new RecordRTCPromisesHandler(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    hidden: 240,
    onGifRecordingStarted: function () {
      console.log('started');
    },
  });

  recorder.startRecording();
};

let arrayMyGIfs = [];
const saveMyGyfs = (gifID) => {
  if (localStorage.getItem('arrayMyGifs') == null) {
    arrayMyGIfs.push(gifID);
  } else {
    arrayMyGIfs = localStorage.getItem('arrayMyGifs').split(',');
    arrayMyGIfs.push(gifID);
  }

  localStorage.setItem('arrayMyGifs', arrayMyGIfs.join());
};

const GIFBYID_URL = 'https://api.giphy.com/v1/gifs?';

const getMyGifs = (container) => {
  let gifs = localStorage.getItem('arrayMyGifs');

  if (gifs) {
    fetch(GIFBYID_URL + 'api_key=' + API_KEY + '&ids=' + gifs)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        renderGifs(res.data, container, 'MyGifs');
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    container.innerHTML = '';
  }
};

const copyToClipboard = (text) => {
  var hiddentextarea = document.createElement('textarea');
  document.body.appendChild(hiddentextarea);
  hiddentextarea.value = text;
  hiddentextarea.select();
  document.execCommand('copy');
  document.body.removeChild(hiddentextarea);
};
