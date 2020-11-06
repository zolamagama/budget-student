const express = require('express');

const exphbs = require('express-handlebars');

const app = express();

const bodyParser = require('body-parser');

const BudgetService = require('./budget');
const budgetService = BudgetService(3000);

app.engine('handlebars', exphbs({
	layoutsDir: './views/layouts'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); // add this line
app.use(bodyParser.json()); // add  this line


app.get('/budget', function (req, res) {

	const budget = budgetService.getBudget();
	// console.log(budget);
	let data = budgetService.getData()
	let labels = budgetService.getList()
	
	let dataStr = JSON.stringify(data)
	let labelStr = JSON.stringify(labels) 
	
	// const budgetService = budgetService.getBudget(3000);

	console.log(budget);

	res.render('index', {
		budget,
		data : dataStr,
		labels : labelStr
	});


});

app.post('/budget', function (req, res) {


	console.log(req.body);

	const budgetItem = {
		name : req.body.expenseName,
		cost : Number(req.body.cost)
	};

	budgetService.addExpense(budgetItem);


	res.redirect("/budget")

});


const PORT = process.env.PORT || 3025;
app.listen(PORT, function () {
	console.log('App started at port:', PORT);
})