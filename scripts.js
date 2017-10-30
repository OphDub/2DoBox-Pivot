$(document).ready(function() { 
  showOnLoad();
  searchIdeas();
});

var $ideaTitle = $('.idea-title');
var $ideaBody = $('.idea-body');
var $saveButton = $('.save-button');

$('.idea-title').keyup(enableButton);
$('.idea-body').keyup(enableButton);
$('.search-ideas').keyup(searchIdeas);
$('.idea-display').on('blur', 'h2', function(){
  editTitle(this);
});
$('.idea-display').on('blur', 'p', function(){
  editBody(this);
});


function Idea(title, body, id) {
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
  $ideaTitle.focus();
})

$ideaBody.on('keydown', function(e) {
  if (e.keyCode == 13 && !e.shiftKey){
    e.preventDefault();
    storeCard();
    showStorage();
    clearInputs();
    disableButton();
    $ideaTitle.focus();
  }
});

function clearInputs() {
  $ideaTitle.val('');
  $ideaBody.val('');
};

function enableButton() {
  if ($('.idea-title').val() === "" || $('.idea-body').val() === "") {
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
  var ideaCard = new Idea($ideaTitle.val(), $ideaBody.val(), uniqueId)
  var stringifiedCard = JSON.stringify(ideaCard);
  localStorage.setItem(uniqueId, stringifiedCard);
}

function showStorage () {
  var ideaArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    var retrieved = localStorage.getItem(localStorage.key(i));
    var parsed = JSON.parse(retrieved);
    ideaArray.push(parsed)
    var card = `<article id=${ideaArray[i].id} class="card">
                  <h2 contenteditable="true">${ideaArray[i].title}</h2>
                  <span class="svg delete" title="delete-button" alt="delete idea"></span>
                  <p contenteditable="true">${ideaArray[i].body}</p>
                  <span class="svg upvote" alt="up vote"></span>
                  <span class="svg downvote" alt="down vote"></span>
                  <span id="quality" class=${ideaArray[i].id}>Quality: Swill</span>
                </article>`   
  }
  $('.idea-display').append(card);
}

function showOnLoad() {
  var ideaArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    var retrieved = localStorage.getItem(localStorage.key(i));
    var parsed = JSON.parse(retrieved);
    ideaArray.push(parsed)
    assignQuality(ideaArray[i]);
    $('.idea-display').append(assignQuality(ideaArray[i]));
  }
}

function assignQuality(idea) {
  var qualityWord = '';
  if (idea.quality == 1) {
    qualityWord = 'Quality: Swill'
  } else if (idea.quality == 2) {
    qualityWord = 'Quality: Plausible'
  } else if (idea.quality == 3) {
    qualityWord = 'Quality: Genius'
  }
 var card = `<article id=${idea.id} class="card">
                <h2 contenteditable="true">${idea.title}</h2>
                <span class="svg delete" title="delete-button" alt="delete idea"></span>
                <p contenteditable="true">${idea.body}</p>
                <span class="svg upvote" alt="up vote"></span>
                <span class="svg downvote" alt="down vote"></span>
                <span id="quality" class=${idea.id}>${qualityWord}</span>
              </article>`
  return card;
}

function searchIdeas(){
  var cardsOnDom = Array.from($('.card'));
  var $searchIdeas = $('.search-ideas');
  $('.card').hide();
  cardsOnDom.forEach(function(card) {
    $("p:contains("+$searchIdeas.val()+")").closest('article').show();
    $("h2:contains("+$searchIdeas.val()+")").closest('article').show();
  })
};

$('.idea-display').on('click', '.delete', function() {
  var parentArticle = this.closest('article').id;
  localStorage.removeItem(parentArticle);
  this.closest('article').remove();
});

function storeQuality(key, idea) {
  localStorage.setItem(key, JSON.stringify(idea))
};

$('.idea-display').on('click', '.upvote', function() {
  var parentArticle = this.closest('article').id;
  var parsedIdea = JSON.parse(localStorage.getItem(parentArticle));
  parsedIdea.quality++;
  if (parsedIdea.quality > 3) {
    parsedIdea.quality = 3;
    storeQuality(parentArticle, parsedIdea);
    return;
  } else if (parsedIdea.quality === 2) {
    $('.'+parentArticle+'').text("Quality: Plausible");
  } else if (parsedIdea.quality === 3){
    $('.'+parentArticle+'').text("Quality: Genius");
  } 
  storeQuality(parentArticle, parsedIdea);
});

$('.idea-display').on('click', '.downvote', function() {
  var parentArticle = this.closest('article').id;
  var parsedIdea = JSON.parse(localStorage.getItem(parentArticle));
  parsedIdea.quality--;
  if (parsedIdea.quality <= 1) {
    parsedIdea.quality = 1;
    $('.'+parentArticle+'').text("Quality: Swill");
    storeQuality(parentArticle, parsedIdea);
    return;
  }   
  else if (parsedIdea.quality === 2) {
    $('.'+parentArticle+'').text("Quality: Plausible");
  }
  else if (parsedIdea.quality === 3){
    $('.'+parentArticle+'').text("Quality: Genius");
  } 
  storeQuality(parentArticle, parsedIdea);
});

function editTitle(foo) {
  var parentArticle = foo.closest('article').id;
  var newTitle = foo.innerHTML;
  var parsedIdea = JSON.parse(localStorage.getItem(parentArticle));
  parsedIdea.title = newTitle;
  localStorage.setItem(parentArticle, JSON.stringify(parsedIdea));
};

function editBody(foo) {
  var parentArticle = this.closest('article').id;
  var newBody = this.innerHTML;
  var parsedIdea = JSON.parse(localStorage.getItem(parentArticle));
  parsedIdea.body = newBody;
  localStorage.setItem(parentArticle, JSON.stringify(parsedIdea));
};

