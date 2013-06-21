
!(function buildPostLogin (N) {
  
  N.postLogin = function receiveLogin (username, password) {
    
    console.log('Posting credentials...');
    
    $.ajax({
      type: 'POST',
      url: '/login',
      data: 'foo',
      success: N.receiveLogin,
      error: N.receiveLogin
    });
    
  };
  
}(window.Nooline));