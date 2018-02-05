/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new' : function (req, res) {

    res.view();

  },

  create: function (req, res, next){


    Product.create(req.params.all(), function productCreated(err, product) {

      // if (err) return next(err);
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };

        return res.redirect('/product/new');
      }
      //
      // req.session.authenticated = true;
      // req.session.User = user;

      // user.online = true;
      product.save(function (err) {
        if (err) return next(err);



        // res.json(user);
        //
        // req.session.flash ={};

        res.redirect('/product');
      });
    });
  },

  show: function(req, res, next) {


    Product.findOne(req.param('id'), function foundProduct(err, product) {
      if (err) return next(err);
      if (!product) return next();
      res.view({
        product : product
      });
    });
  },

  index: function (req, res, next) {

    // console.log(new Date());
    // console.log(req.session.authenticated);

    //get an array of all users in the user controller
    Product.find(function foundProducts (err, products) {
      if (err) return next(err);
      res.view({
        products: products
      });
    });
  },

  edit: function (req, res, next) {

    Product.findOne(req.param('id'), function foundProduct(err, product){
      if (err) return next(err);
      if (!product) return next();

      res.view({
        product: product
      });
    });
  },

  update: function (req, res, next) {
    Product.update(req.param('id'), req.params.all(), function productUpdated (err) {
      if (err) {
        return res.redirect('/product/show/' + req.param('id'));
      }

      res.redirect('/product/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {

    Product.findOne(req.param('id'), function foundProduct (err, product){
      if (err) return next(err);

      if (!product) return next ('Product doesn\'t exist.');

      Product.destroy(req.param('id'), function productDestroyed(err) {
        if (err) return next(err);


        res.redirect('/product');
      });
    });
  },

};

