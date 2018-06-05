/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req,res) {
    res.view();
  },

  create: function (req, res, next){


    User.create(req.params.all(), function userCreated(err, user) {

      // if (err) return next(err);
          if (err) {
            console.log(err);
            req.session.flash = {
              err: err
            };

            return res.redirect('/user/new');
          }

          req.session.authenticated = true;
          req.session.User = user;

          user.online = true;
          user.save(function (err) {
            if (err) return next(err);



            // res.json(user);
            //
            // req.session.flash ={};

            res.redirect('/user/show/' + user.id);
          });
    });
  },

  show: function(req, res, next) {


    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view({
        user: user
      });
    });
  },

  index: function (req, res, next) {

    // console.log(new Date());
    // console.log(req.session.authenticated);

    //get an array of all users in the user controller
    User.find(function foundUsers (err, users) {
      if (err) return next(err);
      res.view({
        users: users
      });
    });
  },

  edit: function (req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user){
      if (err) return next(err);
      if (!user) return next();

      res.view({
        user: user
      });
    });
  },

  update: function (req, res, next) {
    User.update(req.param('id'), req.params.all(), function userUpdated (err) {
      if (err) {
        return res.redirect('/user/show/' + req.param('id'));
      }

      res.redirect('user/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    User.findOne(req.param('id'), function foundUser (err, user){
      if (err) return next(err);

      if (!user) return next ('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);


        res.redirect('/user');
      });
    });
  },

  // This action works with app.js socket.get('/user/subscribe') to
  // subscribe to the User model classroom and instances of the user
  // model
  subscribe: function(req, res) {

    // Find all current users in the user model
    User.find(function foundUsers(err, users) {
      if (err) return next(err);

      // subscribe this socket to the User model classroom
      User.subscribe(req.socket);

      // subscribe this socket to the user instance rooms
      User.subscribe(req.socket, users);

      // This will avoid a warning from the socket for trying to render
      // html over the socket.
      res.send(200);
    });
  }

};

