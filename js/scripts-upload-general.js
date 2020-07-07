document.addEventListener('DOMContentLoaded', async () => {
  let arrow = document.getElementById('header--navbar--arrow');

  arrow.addEventListener('click', () => {
    window.location.assign('index.html');
  });

  let gifresultsgrid = document.getElementById('gifsresultsgrid');
  getMyGifs(gifresultsgrid);

  let howtorecordcancell = document.getElementById('howtorecord--cancell');

  howtorecordcancell.addEventListener('click', () => {
    window.location.assign('index.html');
  });

  let mygifssection = document.getElementById('gifsresults');
  let continuebutton = document.getElementById('howtorecord--continue');
  let howtorecorddiv = document.getElementById('howtorecorddiv');
  let recorddiv = document.getElementById('recorddiv');
  let video = document.getElementById('uploadvideo');

  continuebutton.addEventListener('click', () => {
    mygifssection.style.display = 'none';
    howtorecorddiv.style.display = 'none';
    recorddiv.style.display = 'block';
    getStream(video);
  });
});
