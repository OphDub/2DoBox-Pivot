$(document).ready(function() { 
  // showOnLoad();
  searchIdeas();
});

// var $ideaTitle = $('.idea-title');
// var $ideaBody = $('.idea-body');
// var $saveButton = $('.save-button');

//Event Listeners
$('.idea-title').keyup(enableButton);
$('.idea-body').keyup(enableButton);
$('.search-ideas').keyup(searchIdeas);
$('.idea-display').on('click', '.upvote', upvote);
$('.idea-display').on('click', '.downvote', downvote);
$('.idea-display').on('blur', 'h2', function(){
  editTitle(this);
});
$('.idea-display').on('blur', 'p', function(){
  editBody(this);
});
$('.idea-display').on('click', '.delete', deleteIdea);

//Functions
function Idea(title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = 0;
  this.qualityArray = ['Swill', 'Plausible', 'Genius'];
};

Idea.prototype.changeQuality = function() {
  return this.qualityArray[this.quality];
};

//Need to change this so that card info is stored and prepended to DOM without having to reload EVERY SINGLE CARD.
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

//Pass the entire object instead of separate objects
function storeCard() {
  var id = Date.now();
  var ideaCard = new Idea($('.idea-title').val(), $('.idea-body').val(), id)
  localStorage.setItem(id, JSON.stringify(ideaCard));
  appendCard(ideaCard);
};

//Rename to getStorage?
//Move the template literal for var card to new function appendCard - functionaliy for function reduced solely to pulling everything from localStorage. IT DOES NOTHING ELSE.

function getStorage(foo) {
  JSON.parse(localStorage.getItem(foo));

  // var ideaArray = [];
  // for (var i = 0; i < localStorage.length; i++) {
  //   var parsed = JSON.parse(localStorage.getItem(localStorage.key(i)));
  //   ideaArray.push(parsed);  


  //   var card = `<article id=${ideaArray[i].id} class="card">
  //                 <h2 contenteditable="true">${ideaArray[i].title}</h2>
  //                 <span class="svg delete" title="delete-button" alt="delete idea"></span>
  //                 <p contenteditable="true">${ideaArray[i].body}</p>
  //                 <span class="svg upvote" alt="up vote"></span>
  //                 <span class="svg downvote" alt="down vote"></span>
  //                 <span id="quality" class=${ideaArray[i].id}>Quality: ${ideaArray[i].qualityArray[ideaArray[i].quality]}</span>
  //               </article>`
  // }
  // $('.idea-display').append(card);
};

//This function ONLY prepends cards to the DOM. NOTHING ELSE. It is passed an object will determine where things need to go from there.
//What happens when it is passed an array? Run a for loop through the entire array?

function appendCard(obj) {
  
  var card = `<article id=${obj['id']} class="card">
                <h2 contenteditable="true">${obj['title']}</h2>
                <span class="svg delete" title="delete-button" alt="delete idea"></span>
                <p contenteditable="true">${obj['body']}</p>
                <span class="svg upvote" alt="up vote"></span>
                <span class="svg downvote" alt="down vote"></span>
                <span id="quality" class=${obj['id']}>Quality: ${obj.qualityArray[obj.quality]}</span>
              </article>`

  $('.idea-display').append(card);
};

function showOnLoad() {
  var ideaArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    var parsed = JSON.parse(localStorage.getItem(localStorage.key(i)));
    ideaArray.push(parsed);
    //CALL APPENDCARD FUNCTION HERE
    // assignQuality(ideaArray[i]);
    // $('.idea-display').append((ideaArray[i]));
  }
};

//IS IT EVEN NECESSARY TO HAVE THIS IF I CAN REFERENCE THE QUALITY ARRAY IN THE IDEA OBJECT? WHY HAVE THIS AND OVER COMPLICATE?
function assignQuality(idea) {
  //Necessary to have this var qualityArray here? Can we take this out and call the qualityArray in the Idea Object?
  //Set var qualityWord to the qualityArray in the Idea Object.

  var qualityArray = ['Swill','Plausible','Genius'];
  var qualityWord = qualityArray[i];
  for (var i = 0; i < qualityArray.length; i++) {
    if (idea.quality === 0) {
      var qualityWord = qualityArray[i];
    }
  }

  // if (idea.quality == 1) {
  //   qualityWord = 'Quality: Swill'
  // } else if (idea.quality == 2) {
  //   qualityWord = 'Quality: Plausible'
  // } else if (idea.quality == 3) {
  //   qualityWord = 'Quality: Genius'
  // }

 //CALL APPENDCARD FUNCTION HERE
 // var card = `<article id=${idea.id} class="card">
 //                <h2 contenteditable="true">${idea.title}</h2>
 //                <span class="svg delete" title="delete-button" alt="delete idea"></span>
 //                <p contenteditable="true">${idea.body}</p>
 //                <span class="svg upvote" alt="up vote"></span>
 //                <span class="svg downvote" alt="down vote"></span>
 //                <span id="quality" class=${idea.id}>Quality: ${idea.qualityArray[idea.qualityArray]}</span>
 //              </article>`
 //  return card;
};

function searchIdeas(){
  var cardsOnDom = Array.from($('.card'));
  var $searchIdeas = $('.search-ideas');
  $('.card').hide();
  cardsOnDom.forEach(function(card) {
    $("p:contains("+$searchIdeas.val()+")").closest('article').show();
    $("h2:contains("+$searchIdeas.val()+")").closest('article').show();
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

