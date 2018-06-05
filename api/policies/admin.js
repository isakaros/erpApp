
module.exports = function (req, res, ok) {

  // user is allowed, procced to controller
if (req.session.User && req.session.User.admin){
  return ok();
}

// user is ot allowed
else {
  var requireAdminError = [{name : 'requireAdminError', message: 'You must be an admin'}];
  //   user.action='You must be an admin';
  //   var requireAdminError = user.action;

    req.session.flash = {
    err: requireAdminError
    };
    // res.redirect('/session/new');
    res.redirect('/');

    return;
  }
};
