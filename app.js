import './style.scss';

import budgetController from './js/budgetController';
import UIController from './js/UIController';

const controller = ((budgetCtrl, UICtrl) => {

    const DOM = UICtrl.getDOMStrings();

    const ctrlAddItem = () => {
       const input = UICtrl.getInput();

       console.log(input)
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', (e) => {
        
        if(e.keyCode === 13 || e.which === 13) {
            ctrlAddItem(); 
        }
    });

})(budgetController, UIController);