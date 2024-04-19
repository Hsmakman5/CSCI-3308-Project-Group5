


function showModal(id, title, url) {
  var modalTitle = document.getElementById("modalTitle")
  var idInput = document.getElementById("id")
  var titleInput = document.getElementById("movie_name")
  var urlInput = document.getElementById("url")
  modalTitle.innerHTML = title;
  idInput.setAttribute("value", id);
  titleInput.setAttribute("value", title);
  urlInput.setAttribute("value", url);
}