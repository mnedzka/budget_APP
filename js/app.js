import "../style.scss";

import budgetController from "./budgetController";
import UIController from "./UIController";

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
    //1. Calculate the budget
    budgetCtrl.calculateBudget();

    //2. Return the budget
    let budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);

    console.log(budget);
  };

  const updatePercentages = () => {
    //1. Calculate percentages
    budgetCtrl.calculatePercentages();
    //2. Read percentages from the budget controller
    const percentages = budgetCtrl.getPercentages();
    //3. Update the UI with the new percentages
    UIController.displayPercentages(percentages);
  };

  const ctrlAddItem = () => {
    let input, newItem;
    // Get the field input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //1.  Add the item to the budget controller
      newItem = budgetCtrl.addNewItem(
        input.type,
        input.description,
        input.value
      );

      //2. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      //3.  Clear the fileds
      UICtrl.clearFields();

      //4. Calculate and update budget
      updateBudget();

      //5. Calculate and update the percentages
      updatePercentages();
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

    // 4. Calculate and update the percentages
    updatePercentages();
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
