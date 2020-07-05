const bodyclass = sessionStorage.getItem('bodyclass');
document.addEventListener('DOMContentLoaded', async () => {
  const body = document.querySelector('body');
  const logo = document.getElementById('header--navbar--logo');

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
  let gifsresultsinput = document.getElementById('gifsresultsinput');

  myGifsButton.addEventListener('click', () => {
    searchsection.style.display = 'none';
    suggestedsection.style.display = 'none';
    gifsresultsinput.value = 'Mis Gifos';
  });

  if (bodyclass == 'light') {
    body.classList.remove('dark');
    body.classList.add('light');
    logo.src = 'images/gifOF_logo.png';
  } else if (bodyclass == 'dark') {
    body.classList.remove('light');
    body.classList.add('dark');
    logo.src = 'images/gifOF_logo_dark.png';
  }

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

  const changeThemes = (class1, class2) => {
    body.classList.remove(`${class2}`);
    body.classList.add(`${class1}`);

    themesdiv.style.display = 'none';
    chooseThemeButtonA.classList.remove('button--primaryactive');
    chooseThemeButtonB.classList.remove('button--primaryactive');

    sessionStorage.setItem('bodyclass', `${class1}`);
  };

  const lightbutton = document.getElementById('light-theme-button');
  const darkbutton = document.getElementById('dark-theme-button');

  lightbutton.addEventListener('click', () => {
    changeThemes('light', 'dark');
    logo.src = 'images/gifOF_logo.png';
    lightbutton.classList.add('button--grayactive');
    darkbutton.classList.remove('button--grayactive');
  });
  darkbutton.addEventListener('click', () => {
    changeThemes('dark', 'light');
    logo.src = 'images/gifOF_logo_dark.png';
    darkbutton.classList.add('button--grayactive');
    lightbutton.classList.remove('button--grayactive');
  });
});
