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

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  const updateBudget = () => {
    //calculate the budget
    budgetCtrl.calculateBudget();

    //return the budget
    let budget = budgetCtrl.getBudget();

    //display the budget on the UI
    UICtrl.displayBudget(budget);

    console.log(budget);
  };

  const ctrlAddItem = () => {
    let input, newItem;
    // Get the field input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
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

  const ctrlDeleteItem = e => {
    let itemID, splitID, type, ID;

    itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);
    }

    //1. Delete the item from the data structure
    budgetCtrl.deleteItem(type, ID);

    //2. Delete the item from the UI
    UICtrl.deleteListItem(itemID);

    //3. Update the budget
    updateBudget();
  };

  return {
    init() {
      console.log("Application has started...");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
