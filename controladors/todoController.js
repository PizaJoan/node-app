const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: false})

//Base de dades mongo DB hosteat per mlab
const mongoose = require('mongoose')
mongoose.connect('mongodb://test:123@ds131914.mlab.com:31914/todo')
//Crear un esquema i model perque mongo sapiga com han de entrar les dades
const esquema = new mongoose.Schema({
	item: String
})
const Model = mongoose.model('Model', esquema)

let itemOne = Model({item: 'Primer test'}).save(err => {
	if (err) throw err
	console.log('guardat...')
})

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
