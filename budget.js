module.exports = function BudgetService(income) {

	const budget = {
		income,
		available: 0,
		items: [],
		amountLeft: income,
		total: 0
	}


	function addExpense(expense) {
		budget.total += expense.cost;
		budget.amountLeft -= expense.cost;
		budget.items.push(expense);
	}

	function getBudget(id) {
		return budget
	}

    function setIncome(income) {
        budget.income = Number(income);
        budget.amountLeft = budget.income;

    }

	function getList() {
		var labels = []
		for (const item of budget.items) {
			labels.push(item.name)
		}
		return labels
	}

	function getData() {
		var datas = []
		for (const item of budget.items) {
			datas.push(item.cost);
		}
		return datas
	}

	return {
		addExpense,
		getBudget,
		getList,
		getData

	}

}






