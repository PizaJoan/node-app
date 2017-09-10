let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({extended: false})

let data = [{
	item: 'get milk'
}, {
	item: 'let\'s get some milk'
}, {
	item: 'go boys'
}]

module.exports = function(app) {
	app.get('/todo', (req, res) => {
		res.render('todo', {todo: data})
	})

	app.post('/todo', urlencodedParser, (req, res) => {
		data.push(req.body)
		res.json(data)
	})

	app.delete('/todo/:item', (req, res) => {
		data = data.filter(todo => todo.item.replace(/ /g, '-') !== req.params.item)
		res.json(data)
	})
}
