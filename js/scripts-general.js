document.addEventListener('DOMContentLoaded', async () => {
  const body = document.querySelector('body');
  const logo = document.getElementById('header--navbar--logo');
  const bodyclass = sessionStorage.getItem('bodyclass');

  let activateThemes = (bodyclass) => {
    if (bodyclass == 'light') {
      body.classList.remove('dark');
      body.classList.add('light');
      logo.src = '/assets/gifOF_logo.webp';
    } else if (bodyclass == 'dark') {
      body.classList.remove('light');
      body.classList.add('dark');
      logo.src = '/assets/gifOF_logo_dark.webp';
    } else {
      body.classList.add('light');
    }
  };

  activateThemes(bodyclass);

  logo.addEventListener('click', () => {
    window.location.assign('index.html');
  });

  const uploadButton = document.getElementById('uploadButton');

  uploadButton.addEventListener('click', () => {
    window.location.assign('upload.html');
  });

  let myGifsButton = document.getElementById('myGifsButton');
  let searchsection = document.getElementById('search');
  let suggestedsection = document.getElementById('suggested');
  let gifsresultstext = document.getElementById('gifsresultstext');
  let gifresultsgrid = document.getElementById('gifsresultsgrid');

  myGifsButton.addEventListener('click', () => {
    searchsection.style.display = 'none';
    suggestedsection.style.display = 'none';
    gifsresultstext.innerHTML = 'Mis Guifos';
    getMyGifs(gifresultsgrid);
  });

  const choosethemediv = document.getElementById('choosethemediv');
  const chooseThemeButtonA = document.getElementById('chooseThemeButtonA');
  const chooseThemeButtonB = document.getElementById('chooseThemeButtonB');

  const themesdiv = document.getElementById('themesdiv');

  choosethemediv.addEventListener('click', () => {
    if (chooseThemeButtonA.classList.contains('button--primaryactive')) {
      chooseThemeButtonA.classList.remove('button--primaryactive');
      chooseThemeButtonB.classList.remove('button--primaryactive');
      themesdiv.style.display = 'none';
    } else {
      chooseThemeButtonA.classList.add('button--primaryactive');
      chooseThemeButtonB.classList.add('button--primaryactive');
      themesdiv.style.display = 'block';
    }
  });

  const changeThemes = (themeToAdd, themeToRemove) => {
    body.classList.remove(`${themeToRemove}`);
    body.classList.add(`${themeToAdd}`);

    themesdiv.style.display = 'none';
    chooseThemeButtonA.classList.remove('button--primaryactive');
    chooseThemeButtonB.classList.remove('button--primaryactive');

    sessionStorage.setItem('bodyclass', `${themeToAdd}`);
  };

  const lightbutton = document.getElementById('light-theme-button');
  const darkbutton = document.getElementById('dark-theme-button');

  lightbutton.addEventListener('click', () => {
    changeThemes('light', 'dark');
    logo.src = '/assets/gifOF_logo.webp';
  });
  darkbutton.addEventListener('click', () => {
    changeThemes('dark', 'light');
    logo.src = '/assets/gifOF_logo_dark.webp';
  });
});
