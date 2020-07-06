document.addEventListener('DOMContentLoaded', async () => {
  let counter = document.getElementById('record--counter');
  let buttonstop = document.getElementById('record--buttonstop');
  let date = new Date();
  date.setHours(00, 00, 00);

  let buttonstart = document.getElementById('record--buttonstart');
  let divbuttonsstart = document.getElementById('record--buttons--start');
  let divbuttonsstop = document.getElementById('record--buttons--stop');
  let divbuttonsupload = document.getElementById('record--buttons--upload');
  let recordtitle = document.getElementById('record--title');

  buttonstart.addEventListener('click', async () => {
    divbuttonsstart.style.display = 'none';
    counter.style.display = 'block';
    divbuttonsstop.style.display = 'block';

    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    recordGif(stream);
    recordtitle.innerText = 'Capturando tu gifo';

    let countSeconds = setInterval(function () {
      let seconds = date.getSeconds();
      seconds++;
      date.setSeconds(seconds);

      let dateTemplate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      counter.innerHTML = dateTemplate;

      buttonstop.onclick = () => {
        clearInterval(countSeconds);
      };
    }, 1000);
  });

  let gifpreview = document.getElementById('gifpreview');
  let video = document.getElementById('uploadvideo');
  let blob = null;
  let url = '';

  buttonstop.addEventListener('click', async () => {
    recordtitle.innerText = 'Vista previa';

    await recorder.stopRecording();
    blob = await recorder.getBlob();
    url = URL.createObjectURL(blob);
    video.style.display = 'none';
    gifpreview.src = url;
    gifpreview.style.display = 'block';
    divbuttonsstop.style.display = 'none';
    divbuttonsupload.style.display = 'block';
  });

  let buttonrepeat = document.getElementById('record--buttonrepeat');
  buttonrepeat.addEventListener('click', () => {
    recordtitle.innerText = 'Un chequeo antes de empezar';
    date.setHours(00, 00, 00);
    counter.innerHTML = '0:0:0';
    counter.style.display = 'none';
    divbuttonsupload.style.display = 'none';
    divbuttonsstart.style.display = 'block';
    gifpreview.style.display = 'none';
    video.style.display = 'block';
  });
  let buttonupload = document.getElementById('record--buttonupload');
  let divuploading = document.getElementById('uploading');
  let recorddiv = document.getElementById('recorddiv');
  let divuploaddone = document.getElementById('upload--done');
  let gifpreviewsmall = document.getElementById('gifpreviewsmall');
  const UPLOAD_URL = 'https://upload.giphy.com/v1/gifs?api_key=' + API_KEY;
  buttonupload.addEventListener('click', () => {
    recorddiv.style.display = 'none';
    divuploading.style.display = 'block';

    let formData = new FormData();
    formData.append('file', blob, 'myGif.gif');
    console.log(formData.get('file'));

    var xhr = new XMLHttpRequest();
    xhr.open('POST', UPLOAD_URL, true);
    xhr.withCredentials = true;

    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        let gifObject = JSON.parse(xhr.response);
        saveMyGyfs(gifObject.data.id);
        divuploading.style.display = 'none';
        divuploaddone.style.display = 'block';
        gifpreviewsmall.src = url;
      }
    };

    try {
      xhr.send(formData);
    } catch (e) {
      alert(' Error al enviar el gif: ' + e);
    }
  });

  let buttoncancellupload = document.getElementById(
    'record--buttoncancellupload'
  );

  buttoncancellupload.addEventListener('click', () => {
    divuploading.style.display = 'none';
    recorddiv.style.display = 'block';
  });

  let copygifurl = document.getElementById('copygifurl');
  copygifurl.addEventListener('click', () => {
    try {
      copyToClipboard(url);
      alert('¡Enlace copiado con éxito!');
    } catch (e) {
      alert('¡Error al copiar el enlace!');
    }
  });

  let savegif = document.getElementById('savegif');
  savegif.addEventListener('click', () => {
    invokeSaveAsDialog(blob);
  });

  let uploaddone = document.getElementById('uploaddone');

  uploaddone.addEventListener('click', () => {
    counter.innerHTML = '0:0:0';
    date.setHours(00, 00, 00);
    window.location.assign('upload.html');
  });
});
