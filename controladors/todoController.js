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

module.exports = function(app) {
	app.get('/todo', (req, res) => {
		//aconseguir dades de la base de dades
		Model.find({}, (err, data) => {
			if (err) throw err
			res.render('todo', {todo: data})
		})
	})

	app.post('/todo', urlencodedParser, (req, res) => {
		let newModel = Model(req.body).save((err, data) => {
			if (err) throw err
			res.json(data)
		})
	})

	app.delete('/todo/:item', (req, res) => {
		Model.find({item: req.params.item.replace(/\-/g, ' ')}).remove((err, data) => {
			if (err) throw err
			res.json(data)
		})
	})
}
