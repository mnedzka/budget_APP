import "./style.scss";

import budgetController from "./js/budgetController";
import UIController from "./js/UIController";

const controller = ((budgetCtrl, UICtrl) => {
  const setupEventListeners = () => {
    const DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", e => {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  const ctrlAddItem = () => {
    let input, newItem;

    // Get the field input data
    input = UICtrl.getInput();

    // Add the item to the budget controller
    newItem = budgetCtrl.addNewItem(input.type, input.description, input.value);

    //Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    // Clear the fileds
    UICtrl.clearFields();
  };

  return {
    init() {
      console.log("Application has started...");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
