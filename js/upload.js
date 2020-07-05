document.addEventListener('DOMContentLoaded', async () => {
  let menu = document.getElementById('header--navbar--menu');
  menu.style.display = 'none';
  const logo = document.getElementById('header--navbar--arrow');

  logo.addEventListener('click', () => {
    window.location.assign('index.html');
  });

  const continuebutton = document.getElementById('continuebutton');

  const howtorecorddiv = document.getElementById('howtorecorddiv');
  const recorddiv = document.getElementById('recorddiv');

  let video = document.getElementById('uploadvideo');
  continuebutton.addEventListener('click', () => {
    howtorecorddiv.style.display = 'none';
    recorddiv.style.display = 'block';
    getStream(video);
  });

  let divbuttonsrecord = document.getElementById('record--buttons--record');
  let divbuttonsstop = document.getElementById('record--buttons--stop');
  let divbuttonsupload = document.getElementById('record--buttons--upload');

  divbuttonsstop.style.display = 'none';
  divbuttonsupload.style.display = 'none';

  let buttonrecord = document.getElementById('record--buttonrecord');
  let buttonstop = document.getElementById('record--buttonstop');
  let buttonrepeat = document.getElementById('record--buttonrepeat');
  let buttonupload = document.getElementById('record--buttonupload');

  buttonrecord.addEventListener('click', async () => {
    divbuttonsrecord.style.display = 'none';
    divbuttonsstop.style.display = 'block';
    divbuttonsstop.style.display = 'flex';

    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    funcionprueba(stream);
  });

  let blob = null;

  buttonstop.addEventListener('click', async () => {
    await recorder.stopRecording();
    blob = await recorder.getBlob();

    divbuttonsstop.style.display = 'none';
    divbuttonsupload.style.display = 'block';
    divbuttonsupload.style.display = 'flex';
  });

  const UPLOAD_URL = 'https://upload.giphy.com/v1/gifs?api_key=' + API_KEY;

  buttonupload.addEventListener('click', () => {
    let formData = new FormData();
    formData.append('file', blob, 'myGif.gif');
    console.log(formData.get('file'));

    var xhr = new XMLHttpRequest();
    xhr.open('POST', UPLOAD_URL, true);
    xhr.withCredentials = true;

    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log(xhr.response);
      }
    };
    try {
      xhr.send(formData);
    } catch (e) {}
  });
});
