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

function Idea(title, body, idea) {
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
    var card = `<div id=${ideaArray[i].id} class="card">
                  <h2 contenteditable="true">${ideaArray[i].title}</h2>
                  <span class="svg delete" title="delete-button" alt="delete idea"></span>
                  <p contenteditable="true">${ideaArray[i].body}</p>
                  <span class="svg upvote" alt="up vote"></span>
                  <span class="svg downvote" alt="down vote"></span>
                  <span id="quality" class=${ideaArray[i].id}>Quality: Swill</span>
                </div>`   
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
 var card = `<div id=${idea.id} class="card">
                <h2 contenteditable="true">${idea.title}</h2>
                <span class="svg delete" title="delete-button" alt="delete idea"></span>
                <p contenteditable="true">${idea.body}</p>
                <span class="svg upvote" alt="up vote"></span>
                <span class="svg downvote" alt="down vote"></span>
                <span id="quality" class=${idea.id}>${qualityWord}</span>
              </div>`
  return card;
}

$('.search-ideas').on('change keyup', searchIdeas);

function searchIdeas(){
  var cardsOnDom = Array.from($('.card'));
  var $searchIdeas = $('.search-ideas');
  $('.card').hide();
  cardsOnDom.forEach(function(card) {
    $("p:contains("+$searchIdeas.val()+")").closest('div').show();
    $("h2:contains("+$searchIdeas.val()+")").closest('div').show();
  })
};

$('.idea-display').on('click', '.delete', function() {
  var parentDiv = this.closest('div');
  parentDiv = parentDiv.id;
  localStorage.removeItem(parentDiv);
  this.closest('div').remove();
});

$('.idea-display').on('click', '.upvote', function() {
  var parentDiv = this.closest('div');
  parentDiv = parentDiv.id;
  var parsedIdea = JSON.parse(localStorage.getItem(parentDiv));
    function store() {
      var stringifiedIdea = JSON.stringify(parsedIdea)
      localStorage.setItem(parentDiv, stringifiedIdea)
    }
  parsedIdea.quality++;
  store();
  if (parsedIdea.quality > 3) {
    parsedIdea.quality = 3;
    store();
    return;
  } else if (parsedIdea.quality === 2) {
    $('.'+parentDiv+'').text("Quality: Plausible");
    store();
  } else if (parsedIdea.quality === 3){
    $('.'+parentDiv+'').text("Quality: Genius");
    store();
  } 
});

$('.idea-display').on('click', '.downvote', function() {
  var parentDiv = this.closest('div');
  parentDiv = parentDiv.id;
  var parsedIdea = JSON.parse(localStorage.getItem(parentDiv));
  function store() {
    var stringifiedIdea = JSON.stringify(parsedIdea)
    localStorage.setItem(parentDiv, stringifiedIdea)
  } 
  parsedIdea.quality--;
  store();
  if (parsedIdea.quality <= 1) {
    parsedIdea.quality = 1;
    $('.'+parentDiv+'').text("Quality: Swill");
    store();
    return;
  }   
  else if (parsedIdea.quality === 2) {
    $('.'+parentDiv+'').text("Quality: Plausible");
    store()
  }
  else if (parsedIdea.quality === 3){
    $('.'+parentDiv+'').text("Quality: Genius");
    store()
  } 
});

$('.idea-display').on('focus', 'h2', function() {
  $(this).on('keypress', function(e) {
    var key = e.which || e.keyCode;
        var key = e.which || e.keyCode;
    if (key === 13 && e.shiftKey) {
    }
    else if (key === 13 || this.blur === true) {
      e.preventDefault();
      var parentDiv = this.closest('div');
      parentDiv = parentDiv.id;
      var newTitle = this.innerHTML;
      var parsedIdea = JSON.parse(localStorage.getItem(parentDiv));
      parsedIdea.title = newTitle;
      var stringifiedIdea = JSON.stringify(parsedIdea)
      localStorage.setItem(parentDiv, stringifiedIdea)
    }
  })
  $(this).on('blur', function(event) {
      var parentDiv = this.closest('div');
      parentDiv = parentDiv.id;
      var newTitle = this.innerHTML;
      var parsedIdea = JSON.parse(localStorage.getItem(parentDiv));
      parsedIdea.title = newTitle;
      var stringifiedIdea = JSON.stringify(parsedIdea)
      localStorage.setItem(parentDiv, stringifiedIdea)
  })
})

$('.idea-display').on('focus', 'p', function() {
  $(this).on('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13 && e.shiftKey) {
    }
    else if(key === 13) {
      e.preventDefault();
      var parentDiv = this.closest('div');
      parentDiv = parentDiv.id;
      var newBody = this.innerHTML;
      var parsedIdea = JSON.parse(localStorage.getItem(parentDiv));
      parsedIdea.body = newBody;
      var stringifiedIdea = JSON.stringify(parsedIdea)
      localStorage.setItem(parentDiv, stringifiedIdea)
    }
  })
  $(this).on('blur', function(event) {
      var parentDiv = this.closest('div');
      parentDiv = parentDiv.id;
      var newBody = this.innerHTML;
      var parsedIdea = JSON.parse(localStorage.getItem(parentDiv));
      parsedIdea.body = newBody;
      var stringifiedIdea = JSON.stringify(parsedIdea)
      localStorage.setItem(parentDiv, stringifiedIdea)
  })
})

