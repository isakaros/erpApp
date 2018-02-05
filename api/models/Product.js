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
      required: true
    },

    description: {
      type: 'string',
      required: true
    },

    quantity: {
      type: 'string',
      required: true
    },

    pricePer: {
      type: 'string',
      required: true
    },

    total: {
      type: 'string',
      required: true
    }

  }
};

