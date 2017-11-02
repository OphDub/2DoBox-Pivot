$(document).ready(function() { 
  showOnLoad();
});

$('.task-title').keyup(enableButton);
$('.task-body').keyup(enableButton);
$('.search-tasks').keyup(searchTasks);
$('.task-display').on('click', '.upvote', upvote);
$('.task-display').on('click', '.downvote', downvote);
$('.task-display').on('click', '.delete', deleteTask);
$('.task-display').on('blur', 'h2', function() { 
  editTitle(this);
});
$('.task-display').on('blur', 'p', function() {
  editBody(this);
});

$('.save-button').on('click', function(e) {
  e.preventDefault();
  storeCard();
  clearInputs();
  disableButton();
  $('.task-title').focus();
});

$('.task-body').on('keydown', function(e) {
  if (e.keyCode == 13 && !e.shiftKey){
    e.preventDefault();
    storeCard();
    clearInputs();
    disableButton();
    $('.task-title').focus();
  }
});

//Functions
function Task(title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.importance = 2;
  this.importanceArray = ['None','Low','Normal','High','Critical'];
};

function clearInputs() {
  $('.task-title').val('');
  $('.task-body').val('');
};

function enableButton() {
  if ($('.task-title').val() === "" || $('.task-body').val() === "") {
    $('.save-button').attr('disabled', true);
  }
  else {
    $('.save-button').removeAttr('disabled', false);
  }
};

function disableButton() {
 $('.save-button').attr('disabled', true);
};

function storeCard() {
  var id = Date.now();
  var taskCard = new Task($('.task-title').val(), $('.task-body').val(), id)
  localStorage.setItem(id, JSON.stringify(taskCard));
  prependCard(taskCard);
};

function prependCard(obj) {
  var card = `<article id=${obj['id']} class="card interactive-elements">
                <h2 contenteditable="true">${obj['title']}</h2>
                <button class="svg delete" title="delete-button" alt="delete idea"></button>
                <p contenteditable="true">${obj['body']}</p>
                <button class="svg upvote" alt="up vote"></button>
                <button class="svg downvote" alt="down vote"></button>
                <span id="importance" class=${obj['id']}>Importance: ${obj.importanceArray[obj.importance]}</span>
              </article>`
  $('.task-display').prepend(card);
};

function showOnLoad() {
 for (var i = 0; i < localStorage.length; i++) {
  var task = JSON.parse(localStorage.getItem(localStorage.key(i)));
  prependCard(task);
 } 
};

function searchTasks() {
  var cardsOnDom = Array.from($('.card'));
  $('.card').hide();
  cardsOnDom.forEach(function(card) {
    $("p:contains("+$('.search-tasks').val()+")").closest('article').show();
    $("h2:contains("+$('.search-tasks').val()+")").closest('article').show();
  });
};

function deleteTask() {
  var parentArticle = this.closest('article').id;
  localStorage.removeItem(parentArticle);
  this.closest('article').remove();
};

function storeImportance(key, task) {
  localStorage.setItem(key, JSON.stringify(task))
};

function upvote() {
  var parentArticle = this.closest('article').id;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  if (parsedTask.importance < 5) {
    parsedTask.importance++;
  }
  for (var i = 0; i < parsedTask.importanceArray.length; i++) {
    if (parsedTask.importance === i) {
      $('.'+parentArticle+'').text('Importance: ' + parsedTask.importanceArray[i]);
    }
  }
  storeImportance(parentArticle, parsedTask);
};

function downvote() {
  var parentArticle = this.closest('article').id;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  if(parsedTask.importance > 0) {
    parsedTask.importance--;
  }
  for (var i = 0; i < parsedTask.importanceArray.length; i++) {
    if (parsedTask.importance === i) {
      $('.'+parentArticle+'').text('Importance: ' + parsedTask.importanceArray[i]);
    }
  }
  storeImportance(parentArticle, parsedTask);
};

function editTitle(card) {
  var parentArticle = card.closest('article').id;
  var newTitle = card.innerHTML;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  parsedTask.title = newTitle;
  localStorage.setItem(parentArticle, JSON.stringify(parsedTask));
};

function editBody(card) {
  var parentArticle = card.closest('article').id;
  var newBody = card.innerHTML;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  parsedTask.body = newBody;
  localStorage.setItem(parentArticle, JSON.stringify(parsedTask));
};