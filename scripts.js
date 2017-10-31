$(document).ready(function() { 

showOnLoad();
searchTasks();

});

var $taskTitle = $('.task-title');
var $taskBody = $('.task-body');
var $saveButton = $('.task-button');

$('.task-title').keyup(enableButton);
$('.task-body').keyup(enableButton);
$('.search-tasks').keyup(searchTasks);
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
  showStorage();
  clearInputs();
  disableButton();
  $taskTitle.focus();
})

$taskBody.on('keydown', function(e) {
  if (e.keyCode == 13 && !e.shiftKey){
    e.preventDefault();
    storeCard();
    showStorage();
    clearInputs();
    disableButton();
    $taskTitle.focus();
  }
});

function clearInputs() {
  $taskTitle.val('');
  $taskBody.val('');
};

function enableButton() {
  if ($('.task-title').val() === "" || $('.task-body').val() === "") {
    $('.save-button').attr('disabled', true);
  }
  else {
    $('.save-button').removeAttr('disabled', false);
  }
}

function disableButton() {
 $saveButton.attr('disabled', true);
}

function storeCard(title, body, id) {
  var uniqueId = Date.now();
  var taskCard = new Task($taskTitle.val(), $taskBody.val(), uniqueId)
  var stringifiedCard = JSON.stringify(taskCard);
  localStorage.setItem(uniqueId, stringifiedCard);
}

function showStorage () {
  var taskArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    var retrieved = localStorage.getItem(localStorage.key(i));
    var parsed = JSON.parse(retrieved);
    taskArray.push(parsed)
    var card = `<article id=${taskArray[i].id} class="card">
                  <h2 contenteditable="true">${taskArray[i].title}</h2>
                  <span class="svg delete" title="delete-button" alt="delete task"></span>
                  <p contenteditable="true">${taskArray[i].body}</p>
                  <span class="svg upvote" alt="up vote"></span>
                  <span class="svg downvote" alt="down vote"></span>
                  <span id="quality" class=${taskArray[i].id}>Quality: Swill</span>
                </article>`   
  }
  $('.task-display').append(card);
}

function showOnLoad() {
  var taskArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    var retrieved = localStorage.getItem(localStorage.key(i));
    var parsed = JSON.parse(retrieved);
    taskArray.push(parsed)
    assignQuality(taskArray[i]);
    $('.task-display').append(assignQuality(taskArray[i]));
  }
}

function assignQuality(task) {
  var qualityWord = '';
  if (task.quality == 1) {
    qualityWord = 'Quality: Swill'
  } else if (task.quality == 2) {
    qualityWord = 'Quality: Plausible'
  } else if (task.quality == 3) {
    qualityWord = 'Quality: Genius'
  }
 var card = `<article id=${task.id} class="card">
                <h2 contenteditable="true">${task.title}</h2>
                <span class="svg delete" title="delete-button" alt="delete task"></span>
                <p contenteditable="true">${task.body}</p>
                <span class="svg upvote" alt="up vote"></span>
                <span class="svg downvote" alt="down vote"></span>
                <span id="quality" class=${task.id}>${qualityWord}</span>
              </article>`
  return card;
}

function searchTasks(){
  var cardsOnDom = Array.from($('.card'));
  var $searchTasks = $('.search-tasks');
  $('.card').hide();
  cardsOnDom.forEach(function(card) {
    $("p:contains("+$searchTasks.val()+")").closest('article').show();
    $("h2:contains("+$searchTasks.val()+")").closest('article').show();
  })
};

$('.task-display').on('click', '.delete', function() {
  var parentArticle = this.closest('article').id;
  localStorage.removeItem(parentArticle);
  this.closest('article').remove();
});

function storeQuality(key, task) {
  localStorage.setItem(key, JSON.stringify(task))
};

$('.task-display').on('click', '.upvote', function() {
  var parentArticle = this.closest('article').id;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  parsedTask.quality++;
  if (parsedTask.quality > 3) {
    parsedTask.quality = 3;
    storeQuality(parentArticle, parsedTask);
    return;
  } else if (parsedTask.quality === 2) {
    $('.'+parentArticle+'').text("Quality: Plausible");
  } else if (parsedTask.quality === 3){
    $('.'+parentArticle+'').text("Quality: Genius");
  } 
  storeQuality(parentArticle, parsedTask);
});

$('.task-display').on('click', '.downvote', function() {
  var parentArticle = this.closest('article').id;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  parsedTask.quality--;
  if (parsedTask.quality <= 1) {
    parsedTask.quality = 1;
    $('.'+parentArticle+'').text("Quality: Swill");
    storeQuality(parentArticle, parsedTask);
    return;
  }   
  else if (parsedTask.quality === 2) {
    $('.'+parentArticle+'').text("Quality: Plausible");
  }
  else if (parsedTask.quality === 3){
    $('.'+parentArticle+'').text("Quality: Genius");
  } 
  storeQuality(parentArticle, parsedTask);
});

function editTitle(foo) {
  var parentArticle = foo.closest('article').id;
  var newTitle = foo.innerHTML;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  parsedTask.title = newTitle;
  localStorage.setItem(parentArticle, JSON.stringify(parsedTask));
};

function editBody(foo) {
  var parentArticle = this.closest('article').id;
  var newBody = this.innerHTML;
  var parsedTask = JSON.parse(localStorage.getItem(parentArticle));
  parsedTask.body = newBody;
  localStorage.setItem(parentArticle, JSON.stringify(parsedTask));
};

