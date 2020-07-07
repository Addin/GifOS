document.addEventListener('DOMContentLoaded', async () => {
  const gifresultsgrid = document.getElementById('gifsresultsgrid');
  getTendenciesGifs(gifresultsgrid);

  let searchInput = document.getElementById('search--input');
  let searchButton = document.getElementById('search--button');
  let searchsuggested = document.getElementById('search--suggested');
  let lastsearchs = document.getElementById('search--lastsearchs');
  let gifsresultstext = document.getElementById('gifsresultstext');

  const searchEventListener = () => {
    searchGifs(searchInput.value, gifresultsgrid);
    gifsresultstext.innerText = searchInput.value;
    gifsresultstext.scrollIntoView();
    saveSearchs(searchInput.value.trim());
    searchInput.value = '';
    searchsuggested.style.display = 'none';
    lastsearchs.style.display = 'block';
    lastsearchs.style.display = 'flex';
  };

  searchButton.addEventListener('click', searchEventListener);

  searchInput.addEventListener('keyup', (e) => {
    if (searchInput.value.trim() != '' && e.keyCode == 13) {
      searchEventListener();
    }
  });

  let searchButtons = document.getElementsByClassName('searchButtons');
  Array.from(searchButtons).forEach((element) => {
    element.addEventListener('click', () => {
      gifsresultstext.innerText = element.textContent;
      searchsuggested.style.display = 'none';
      searchGifs(element.childNodes[0].nodeValue, gifresultsgrid);
      gifsresults.scrollIntoView();
    });
  });

  let buttonicon = document.getElementById('buttonicon');
  searchInput.addEventListener('keyup', () => {
    if (searchInput.value.trim() != '') {
      searchButton.removeAttribute('disabled');
      searchButton.classList.add('button--primary');
      searchsuggested.style.display = 'block';
      buttonicon.style.opacity = 1;
    } else {
      searchButton.setAttribute('disabled', '');
      searchButton.classList.remove('button--primary');
      buttonicon.style.opacity = 0.3;
      searchsuggested.style.display = 'none';
    }
  });

  let seeMoreButtons = document.getElementsByClassName('button--seemore');

  Array.from(seeMoreButtons).forEach((element) => {
    element.addEventListener('click', () => {
      searchGifs(element.name, gifresultsgrid);
      gifsresults.scrollIntoView();
    });
  });

  let superheroesCategory = document.getElementById('superheroesCategory');
  let petsCategory = document.getElementById('petsCategory');
  let fantasyCategory = document.getElementById('fantasyCategory');
  let animeCategory = document.getElementById('animeCategory');

  searchCategoryGifs('star lord', superheroesCategory);
  searchCategoryGifs('cats', petsCategory);
  searchCategoryGifs('witcher fight', fantasyCategory);
  searchCategoryGifs('luffi one piece', animeCategory);
});
