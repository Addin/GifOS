document.addEventListener('DOMContentLoaded', async () => {
  const gifresultsgrid = document.getElementById('gifsresultsgrid');
  getTendenciesGifs(gifresultsgrid);
  let searchInput = document.getElementById('search--input');
  let searchButton = document.getElementById('search--button');
  let searchsuggested = document.getElementById('search--suggested');
  let lastsearchs = document.getElementById('search--lastsearchs');

  const searchEventListener = () => {
    searchGifs(searchInput.value, gifresultsgrid);
    gifsresultsinput.value = searchInput.value;
    gifsresultsinput.scrollIntoView();
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

  let suggestedButtons = document.getElementsByClassName('suggestedButtons');

  Array.from(suggestedButtons).forEach((element) => {
    searchGifs(element.childNodes[0].nodeValue);
  });

  let searchButtons = document.getElementsByClassName('searchButtons');

  Array.from(searchButtons).forEach((element) => {
    element.addEventListener('click', () => {
      gifsresultsinput.value = searchInput.value;
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
});
