const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'fc58f77209234a3f997bf0cd36382291'
});
const Notface = {
	outputs: []
}
const handleApiCall = (req, res) =>{
	app.models
  	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  	.then(data => {
  		if (data.outputs[0].data.regions[0].region_info.bounding_box) {
  			res.json(data);
  		}
  		else {
  			res.json(Notface);
  		}
  		// console.log('data', data.status.description);
  		// console.log('data', data.status.code);
  		// console.log('data', data.outputs[0].data.regions[0]);
  	})
  	.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) =>{
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage, //cause of es6 {a:a} === {a}
	handleApiCall
};