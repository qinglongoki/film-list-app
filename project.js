const form = document.querySelector('#film-form');
const titleElement = document.querySelector('#title'); 
const directorElement = document.querySelector('#director');
const urlElement = document.querySelector('#url');
const cardBody = document.querySelectorAll('.card-body')[1];
const clear = document.querySelector('#clear-films');

//All events
eventListeners();

function eventListeners(){
    form.addEventListener('submit', addFilm);
    document.addEventListener('DOMContentLoaded', function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener('click', deleteFilm);
    clear.addEventListener('click', clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    if(title === "" || director === "" || url === ""){
        UI.displayMessage('Tüm alanları doldurun', 'danger');
    }else{
        const newFilm = new Film(title, director, url)
        UI.displayMessage('Başarıyla eklendi', 'success');
        Storage.addFilmToStorage(newFilm); //adding film to Storage
        UI.addFilmtoUI(newFilm); // adding film to UI
    }
    UI.clearInputs(titleElement, urlElement, directorElement);
    e.preventDefault();
}
function deleteFilm(e){
  if(e.target.id === "delete-film"){
      UI.deleteFilmFromUI(e.target);
      Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
      UI.displayMessage("Silme işlemi başarılı..", 'success');
  }
}
function clearAllFilms(){
    if(confirm('Emin misin ?')){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
}