const Profile = require('../model/model');
const fs = require('fs')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


module.exports.create = function (req, res) {
    var nom = req.body.nom
    var email = req.body.email
    var password = req.body.password
    var photo_profile = req.body.filename

    let imageFile = req.files.file;

    imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err, 'erreur');
        }
    });


    Profile.find()
        .then(note0 => {
            if (note0.length == 0) {
                id = 0;

            } else {
                id = parseInt(note0[note0.length - 1].id) + 1;
            }

            const profil = new Profile({ _id: id, nom: nom,email:email, password: password,photo_profile: photo_profile });
            (!nom || !email || !password) ? console.log(" ", nom,email,password) : profil.save()
                .then(() => {
                    Profile.find()
                        .then(note => {
                            res.send(note);
                        })
                })
                .catch(e => {
                    res.status(500).send({ mes: e.mes || "erreur" })
                })
                bcrypt.hash(profil.password, salt, (err, hash) => {
                    if (err) throw err;
                    profil.password = hash;
                    profil
                      .save()
                  });
        })
       
}


module.exports.profilgetter = (req, res) => {
    Profile.find()
        .then(note => {
            res.send(note)
        })
        .catch(e => {
            res.status(500).send({ mes: e.mes || "erreur" })
        });
};

module.exports.Image = (req, res) => {
    try {
        let a = fs.readFileSync('./controlleur/public/'+req.params.monimage)
        res.write(a)
        res.end()
    } catch (e) {
        console.log("tsy lasa le sary", e.stack);
    }
};


