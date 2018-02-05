/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 */

module.exports = function(req, res, ok) {

  // var sessionUserMatchesId = req.session.User.id === req.param('id');
  // var isAdmin = req.session.User.admin;
  //
  // // The requested id does not match the user's id,
  // // and this is not an admin
  // if (!(sessionUserMatchesId || isAdmin)) {
  //   var noRightsError = [{name: 'noRights', message: 'You must be an admin.'}];
  //   req.session.flash = {
  //     err: noRightsError
  //   };
  //   res.redirect('/session/new');
  //   return;
  // }
  //
  // ok();

  if (req.session.User.id || req.session.User.admin){
    return ok();
  }

// user is ot allowed
  else {
    var requireAdminError = [{name : 'requireAdminError', message: 'You must be an admin'}];
    req.session.flash = {
      err: requireAdminError
    };
    res.redirect('/session/new');
    return;
  }



};
