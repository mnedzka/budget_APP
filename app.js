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

  const updateBudget = () => {
    //calculate the budget
    budgetCtrl.calculateBudget();

    //return the budget
    const budget = budgetCtrl.getBudget();

    console.log(budget);
  };

  const ctrlAddItem = () => {
    let input, newItem;

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // Get the field input data
      input = UICtrl.getInput();

      // Add the item to the budget controller
      newItem = budgetCtrl.addNewItem(
        input.type,
        input.description,
        input.value
      );

      //Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      // Clear the fileds
      UICtrl.clearFields();

      //calculate and update budget
      updateBudget();
    }
  };

  return {
    init() {
      console.log("Application has started...");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
