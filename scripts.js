$(document).ready(function() { 
  showOnLoad();
});

//Event Listeners
$('.idea-title').keyup(enableButton);
$('.idea-body').keyup(enableButton);
$('.search-ideas').keyup(searchIdeas);
$('.idea-display').on('click', '.upvote', upvote);
$('.idea-display').on('click', '.downvote', downvote);
$('.idea-display').on('click', '.delete', deleteIdea);

$('.idea-display').on('blur', 'h2', function(){
  editTitle(this);
});

$('.idea-display').on('blur', 'p', function(){
  editBody(this);
});

$('.save-button').on('click', function(e) {
  e.preventDefault();
  storeCard();
  clearInputs();
  disableButton();
  $('.idea-title').focus();
});

$('.idea-body').on('keydown', function(e) {
  if (e.keyCode == 13 && !e.shiftKey){
    e.preventDefault();
    storeCard();
    clearInputs();
    disableButton();
    $('.idea-title').focus();
  }
});

//Functions
function Idea(title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = 0;
  this.qualityArray = ['Swill', 'Plausible', 'Genius'];
};

function clearInputs() {
  $('.idea-title').val('');
  $('.idea-body').val('');
};

function enableButton() {
  if ($('.idea-title').val() === "" || $('.idea-body').val() === "") {
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
  var ideaCard = new Idea($('.idea-title').val(), $('.idea-body').val(), id)
  localStorage.setItem(id, JSON.stringify(ideaCard));
  prependCard(ideaCard);
};

function prependCard(obj) {
  var card = `<article id=${obj['id']} class="card">
                <h2 contenteditable="true">${obj['title']}</h2>
                <span class="svg delete" title="delete-button" alt="delete idea"></span>
                <p contenteditable="true">${obj['body']}</p>
                <span class="svg upvote" alt="up vote"></span>
                <span class="svg downvote" alt="down vote"></span>
                <span id="quality" class=${obj['id']}>Quality: ${obj.qualityArray[obj.quality]}</span>
              </article>`
  $('.idea-display').prepend(card);
};

function showOnLoad() {
 for (var i = 0; i < localStorage.length; i++) {
  var pants = JSON.parse(localStorage.getItem(localStorage.key(i)));
  prependCard(pants);
 } 
};

function searchIdeas(){
  var cardsOnDom = Array.from($('.card'));
  $('.card').hide();
  cardsOnDom.forEach(function() {
    $("p:contains("+$('.search-ideas').val()+")").closest('article').show();
    $("h2:contains("+$('.search-ideas').val()+")").closest('article').show();
  })
};

function deleteIdea() {
  var parentArticle = this.closest('article').id;
  localStorage.removeItem(parentArticle);
  this.closest('article').remove();
};

function storeQuality(key, idea) {
  localStorage.setItem(key, JSON.stringify(idea))
};

function upvote() {
  var parentArticle = this.closest('article').id;
  var parsedIdea = JSON.parse(localStorage.getItem(parentArticle));
  if (parsedIdea.quality < 2) {
    parsedIdea.quality++;
  }
  for (var i = 0; i < parsedIdea.qualityArray.length; i++) {
    if (parsedIdea.quality === i) {
      $('.'+parentArticle+'').text('Quality: ' + parsedIdea.qualityArray[i]);
    }
  }
  storeQuality(parentArticle, parsedIdea);
};

function downvote() {
  var parentArticle = this.closest('article').id;
  var parsedIdea = JSON.parse(localStorage.getItem(parentArticle));
  if(parsedIdea.quality > 0) {
    parsedIdea.quality--;
  }
  for (var i = 0; i < parsedIdea.qualityArray.length; i++) {
    if (parsedIdea.quality === i) {
      $('.'+parentArticle+'').text('Quality: ' + parsedIdea.qualityArray[i]);
    }
  }
  storeQuality(parentArticle, parsedIdea);
};

function editTitle(foo) {
  var parentArticle = foo.closest('article').id;
  var newTitle = foo.innerHTML;
  var parsedIdea = JSON.parse(localStorage.getItem(parentArticle));
  parsedIdea.title = newTitle;
  localStorage.setItem(parentArticle, JSON.stringify(parsedIdea));
};

function editBody(foo) {
  var parentArticle = foo.closest('article').id;
  var newBody = foo.innerHTML;
  var parsedIdea = JSON.parse(localStorage.getItem(parentArticle));
  parsedIdea.body = newBody;
  localStorage.setItem(parentArticle, JSON.stringify(parsedIdea));
};