/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
module.exports = {

  'new': function (req, res) {

    //episode 13 :Building a Sails Application: Ep13 - Sign-in page, session controller, new action, and sessions.
    // var oldDateObj = new Date();
    // var newDateObj = new Date(oldDateObj.getTime() + 60000);
    // req.session.cookie.expires = newDateObj;
    // req.session.authenticated = true;
    // console.log(new Date());
    //console.log(req.session);
    res.view('session/new');
  },

  create: function (req, res, next) {

    if (!req.param('email') || !req.param('password')) {

      var usernamePasswordRequiredError = [{
        name: 'usernamePasswordRequired',
        message: 'you must enter both a username and password.'
      }];

      req.session.flash = {
        err: usernamePasswordRequiredError

      };

      res.redirect('/session/new');
      return;
    }

    User.findOne({email: req.param('email')}).exec(function foundUser(err, user){

      if (err) return next(err);

      if (!user){
       var noAccountError = [{name: 'noAccount', message: 'the email address ' + req.param('email') + 'not found'}];
        req.session.flash = {
         err: noAccountError
        };
        res.redirect('/session/new');
       return;
      }


      bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
        if (err) return next(err);

        if (!valid) {
          var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatchError', message: 'invalid password and username combination.'}];
          req.session.flash = {
            err: usernamePasswordMismatchError
          };
          res.redirect('/session/new');
          return;
        }

        req.session.authenticated = true;
        req.session.User = user;

        res.redirect('/user/show/' + user.id);
      });

    });

  }

};

