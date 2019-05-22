var controlleur = require('../controlleur/controlleur');


module.exports.route =function (app) {

app.route('/upload')
  .post(controlleur.create)
  .get(controlleur.profilgetter)

  app.route('/image/:monimage')
  .get(controlleur.Image)
}