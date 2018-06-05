/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    category: {
      type: 'string',
      required: true
    },

    name: {
      type: 'string',
      required: true,
      // unique: true
    },

    description: {
      type: 'string',
      required: true
    },

    quantity: {
      type: 'integer',
      required: true
    },

    pricePer: {
      type: 'float',
      required: true
    },

    total: {
      type: 'string'
      // required: true
    }

  },
  //
  // beforeCreate: function (values, next, req) {
  //
  //   //this checks to make sure the password and confirmation match before creating record
  //
  //   Product.findOne(req.param('name'), function foundUser(err, product){
  //
  //       if(product){
  //         Product.update(req.param('quantity'), req.params('all'), function productUpdated(err) {
  //
  //           if (err) {
  //             return res.redirect('/product/show/' + req.param('quantity'));
  //           }
  //
  //           res.redirect('product/show/' + req.param('quantity'));
  //         });
  //       }
  //
  //   });

    // if (values.name || values.password !== values.confirmation) {
    //
    //   return next({err: ["password doesn 't match password confirmation"]});
    // }


  // }
};

