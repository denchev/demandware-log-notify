document.addEventListener('DOMContentLoaded', function () {

  chrome.storage.local.get(['demandware_server', 'demandware_username', 'demandware_password'], function(items) {
    $('#server').val(items.demandware_server);
    $('#username').val(items.demandware_username);
    $('#password').val(items.demandware_password);
  });

  $('#save').on('click', function() {

    var username = $('#username').val(),
        server = $('#server').val(),
        password = $('#password').val();

    chrome.storage.local.set({'demandware_server' : server, 'demandware_username' : username, 'demandware_password' : password}, function() {
      console.log('Save settings');
    });

    return false;
  });
});