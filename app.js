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

    input = UICtrl.getInput();

    newItem = budgetCtrl.addNewItem(input.type, input.description, input.value);
  };

  return {
    init() {
      console.log("Application has started...");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
