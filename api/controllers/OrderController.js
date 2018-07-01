/**
 * ThingController
 *
 * @description :: Server-side logic for managing things
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  'new' : function (req, res) {

    res.view();

  },

  findOrCreate: function (req, res, next){
    let product = req.params.all();

    delete product._csrf;

    Product.find({name:product.name}, function productFound(err, foundProduct) {

      // if (err) return next(err);
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/product');
      }

      if(foundProduct.length === 0) {
        Product.create(req.params.all(), function productCreated(err, product) {
          if (err) {
            console.log(err);
            req.session.flash = {
              err: err
            };
            return res.redirect('/product/new');
          }
          product.save(function (err) {
            if (err) return next(err);
            res.redirect('/product');
          });
        });
      }
      else {
        let existingProduct = foundProduct[0];
        var oldQuantity = existingProduct.quantity;
        var newQuantity = +oldQuantity + +(product.quantity);
        product.id = existingProduct.id;

        Product.update({id:product.id}, {quantity:newQuantity}, function productUpdated (err) {
          if (err) {
            return res.redirect('/product/show/' + product.id);
          }

          res.redirect('/product/show/' +  product.id);
        });
      }

      /* product.save(function (err) {
         if (err) return next(err);
         res.redirect('/product');
       });*/
    });
  },

  index: function (req, res, next) {

    // console.log(new Date());
    // console.log(req.session.authenticated);

    Product.find(function foundProducts (err, products) {
      if (err) return next(err);
      res.view({
        products: products
      });
    });
  }

};

