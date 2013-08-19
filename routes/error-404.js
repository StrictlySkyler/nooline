
module.exports = function error404 (error, info) {
  console.error(error);
  
  info.res.status(404).render('common/views/error', {
    status: 404,
    message: info.errorMessage,
    redirect: info.nooline.settings.redirect,
    port: info.nooline.settings.prettyport,
    error: info.errorDetail,
    currentYear: new Date().getFullYear(),
    partials: {
      'head': '../../sites/' 
        + info.nooline.settings.redirect 
        + '/views/partials/head',
      'global-header': '../../sites/' 
        + info.nooline.settings.redirect 
        + '/views/partials/global-header',
      'meta': '../../sites/' 
        + info.nooline.settings.redirect 
        + '/views/partials/meta',
      'global-footer': '../../sites/' 
        + info.nooline.settings.redirect 
        + '/views/partials/global-footer'
    }
  });
}