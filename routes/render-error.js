
module.exports = function renderError (error, info) {
  console.error(error);
  
  info.res.status(404).render('error', {
    status: 404,
    message: info.errorMessage,
    redirect: info.nooline.settings.redirect,
    port: info.nooline.settings.prettyport,
    error: info.errorDetail
  });
}