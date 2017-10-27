# Project: 2DoBox

Primary goal for this project was to refactor, pivot, and introduce additional features based on another team's project. Following snippet is a summary for the project which served as the foundational code for this project.

```
Our project spec as assigned was to create an webpage that is able to accept user input for idea cards that are stored locally on the user's machine. This project also establishes some basic foundations for understanding interaction with user data in a limited scope. Each card is assigned a quality that is dynamic and can be changed by the user via an upvote/downvote. All cards should also persist on the page through reload. Users should also be able to make changes to each idea card and have the changes show dynamically without a page reload. Other project requirements are listed below.
```

## Project Requirements
The project is broken down into four phases: refactor, pivot, introduction of additional features, and extensions. Each section breaks down each 

#### Phase 1: Refactor
Refactor the original work. General guidelines for this phase are as follows:
  * Small JavaScript functions focused on single responsibility (SRP) - for example, one function should not handle both disabled button state and rendering elements to the DOM
  * Consistent formatting, indentation, and naming schemes
  * Smart, concise comments (only when absolutely needed for clarity)
  * Little to no duplication in JavaScript (DRY principle)
  * Avoid deep nesting (for if/else conditionals)
  * Line lengths (keep them short and readable to avoid horizontal scrolling in your text editor)
  * File and folder organization (images, CSS directories

Specific contraints for this phase also include:
  * Cannot use any nested if/else statements
  * Should not use anonymous functions (e.g. event listeners)
  * Use of callback functions is preferred
  * HTML must follow basic accessibility guidelines (semantic tagging, image attributes, roles)
  * No use of global variables
  * Functions cannot be longer than 8 lines (including event listeners)

#### Phase 2: Pivot
User Interaction:
  * See two text boxes for entering the Title and Task for a new TODO, and a Save button for committing that TODO.

  * When a user clicks Save:
    * A new TODO with the provided title and body should appear in the TODO list.
    * The text fields should be cleared and ready to accept a new TODO.
    * The page should not reload.
    * The TODO should be persisted (in localStorage) - it should still be present upon reloading the page.
    * The Save button should be disabled when there is not valid content in both input fields.
  
  * When viewing the TODO List:
    * Each TODO in the list should have a link or button to Delete (or 𝗫).
    * Upon clicking Delete, the appropriate TODO should be removed from the list.
    * The page should not reload when an idea is deleted.
    * The TODO should be removed from localStorage - it should not re-appear on next page load.

  ##### Deleting an existing TODO
  * When viewing the TODO list:
    * Each TODO in the list should have a link or button to Delete (or 𝗫).
    * Upon clicking Delete, the appropriate TODO should be removed from the list.
    * The page should not reload when an idea is deleted.
    * The TODO should be removed from localStorage - it should not re-appear on next page load.

  ##### Editing an existing TODO
  When a user clicks the title or task of a TODO in the list, that text should:
    * Become an editable text field, pre-populated with the existing TODO title or task.
    * The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
    * If the user reloads the page, their edits will be reflected.
  ##### Filtering
  We’d like our users to be able to easily find specific TODOs they’ve already created, so let’s provide them with a filtering interface on the TODO list.
    * At the top of the TODO list, include a text field labeled Filter.
    * As a user types in the filter box, the list of TODOs should filter in real time to only display TODOs whose title or task include the user’s text.
    * The page should not reload.
    * Clearing the filter box should restore all the ideas to the list.

#### Phase 3: Additional Features
  ##### Marking a TODO as completed
   When viewing the TODO list:
     * Each TODO in the list should have a button called Completed Task.
     * When a the user clicks the Completed Task button, the idea should be either grayed out and/or shown with a strike through text.
     * On reloading the page the page, the completed TODOs should be exempted (but not deleted) from the list.
     * When the user clicks the show completed TODOs, the completed TODOs should be loaded back onto the top of the TODO list.

  ##### Importance
   Each TODO should be given a level of importance.
    * Users should be able to change the level of importance by up-voting or down-voting that specific TODO.
    * Each TODO should start with a level of Normal.
    * Levels of importance are as follows:
        1) Critical
        2) High
        3) Normal
        4) Low
        5) None

   * The change of importance should persist after a page refresh.

  ##### Recent TODOs
  The application should only show the ten most recent TODOS.
   * The application should contain a button labeled Show more TODOs ....
   * When a user clicks on the Show more TODOs... button, this list should load additional messages from the past.
  
  ##### Filter by Importance
  The application should allow users to filter the TODO list based on level of importance.
    * Your application should have 5 buttons corresponding to each level of importance (Critical, High, Normal, Low, and None).
    * When one of the filter buttons is clicked, the TODO list should only display TODOs with the selected importance.

#### Extensions
  ##### Character Counter
   The application is able to count the number of characters inside of the input field in real time.
    * As the user types, the character count should increment up.
    * If the user deletes characters, then the character count should decrease.

  ##### Submit button disabled based on character count
   The submit button should be disabled when there is not valid content in both input fields and if the input field character count exceeds 120 characters.

  ##### TODO Due Dates
   When viewing the TODO list:
    * Each TODO should have an option to set a due date for the specific TODO.
    * Once a TODO’s due date is reached, the TODO should show a visual indication that it is past due if it has not been completed.

## Authors

* [**Parker Lindley**](https://github.com/etcetera8) - *Initial work* -
* [**Emily Kuckleman**](https://github.com/ekuckelman)  - *Initial work*-

* [**Ophus Wong**](https://github.com/ophdub) -*Contributor for this repo*-
* [**Kailin Cannon**](https://github.com/Kc2693) -*Contributor for this repo*-

## Acknowledgments

* 
