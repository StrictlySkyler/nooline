
module.exports = function renderError (error, info) {
  console.error(error);
  
  info.res.status(404).render('error', {
    status: 404,
    message: info.errorMessage,
    redirect: info.nooline.settings.redirect,
    port: info.nooline.settings.prettyport,
    error: info.errorDetail,
    currentYear: new Date().getFullYear(),
    partials: {
      'head': info.nooline.settings.redirect + '/partials/head',
      'global-header': info.nooline.settings.redirect 
        + '/partials/global-header',
      'meta': info.nooline.settings.redirect + '/partials/meta',
      'global-footer': info.nooline.settings.redirect 
        + '/partials/global-footer'
    }
  });
}