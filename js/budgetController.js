const budgetController = (() => {
  // const Expense = (id, description, value) => {
  //     this.id = id;
  //     this.description = description;
  //     this.value = value;
  // }

  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    }

    calcPercentage(totalIncome) {
      if (totalIncome > 0) {
        this.percentage = Math.round(this.value / totalIncome * 100);
      } else {
        this.percentage = -1;
      }
    }

    getPercentage() {
      return this.percentage;
    }
  }

  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  const calculateTotal = type => {
    let sum = 0;
    data.allItems[type].forEach(item => (sum += item.value));
    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addNewItem(type, des, val) {
      let newItem, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },

    deleteItem(type, id) {
      let ids, index;

      ids = data.allItems[type].map(item => {
        return item.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    testing() {
      console.log(data);
    },

    calculateBudget() {
      //calculate total income and expenses
      calculateTotal("inc");
      calculateTotal("exp");

      //calculate the budget
      data.budget = data.totals.inc - data.totals.exp;

      if (data.totals.inc > 0) {
        //calculate the percentage of income that we spend
        data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages() {
      data.allItems.exp.forEach(item => {
        item.calcPercentage(data.totals.inc);
      });
    },

    getPercentages() {
      return data.allItems.exp.map(item => {
        return item.getPercentage();
      });
    },

    getBudget() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    }
  };
})();

export default budgetController;
