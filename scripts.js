$(document).ready(function() { 
  showOnLoad();
});

$('.task-title').keyup(enableButton);
$('.task-body').keyup(enableButton);
$('.search-tasks').keyup(searchTasks);
$('.task-display').on('click', '.upvote', upvote);
$('.task-display').on('click', '.downvote', downvote);
$('.task-display').on('click', '.delete', deleteTask);
$('.task-display').on('blur', 'h2', function(){
  editTitle(this);
});
$('.task-display').on('blur', 'p', function(){
  editBody(this);
});

function Task(title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = 1;
}

$saveButton.on('click', function(e) {
  e.preventDefault();
  storeCard();
  clearInputs();
  disableButton();
  $taskTitle.focus();
});

$taskBody.on('keydown', function(e) {
  if (e.keyCode == 13 && !e.shiftKey){
    e.preventDefault();
    storeCard();
    clearInputs();
    disableButton();
    $taskTitle.focus();
  }
});

//Functions
function Task(title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = 0;
  this.qualityArray = ['Swill', 'Plausible', 'Genius'];
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
  var card = `<article id=${obj['id']} class="card">
                <h2 contenteditable="true">${obj['title']}</h2>
                <button class="svg delete" title="delete-button" alt="delete idea"></button>
                <p contenteditable="true">${obj['body']}</p>
                <button class="svg upvote" alt="up vote"></button>
                <button class="svg downvote" alt="down vote"></button>
                <span id="quality" class=${obj['id']}>Quality: ${obj.qualityArray[obj.quality]}</span>
              </article>`
  $('.task-display').prepend(card);
};

function showOnLoad() {
 for (var i = 0; i < localStorage.length; i++) {
  var task = JSON.parse(localStorage.getItem(localStorage.key(i)));
  prependCard(task);
 } 
};

function searchTasks(){
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

function storeQuality(key, task) {
  localStorage.setItem(key, JSON.stringify(task))
};

function upvote() {
  var parentArticle = this.closest('article').id;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  if (parsedTask.quality < 2) {
    parsedTask.quality++;
  }
  for (var i = 0; i < parsedTask.qualityArray.length; i++) {
    if (parsedTask.quality === i) {
      $('.'+parentArticle+'').text('Quality: ' + parsedTask.qualityArray[i]);
    }
  }
  storeQuality(parentArticle, parsedTask);
};

function downvote() {
  var parentArticle = this.closest('article').id;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  if(parsedTask.quality > 0) {
    parsedTask.quality--;
  }
  for (var i = 0; i < parsedTask.qualityArray.length; i++) {
    if (parsedTask.quality === i) {
      $('.'+parentArticle+'').text('Quality: ' + parsedTask.qualityArray[i]);
    }
  }
  storeQuality(parentArticle, parsedTask);
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