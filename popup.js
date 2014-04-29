document.addEventListener('DOMContentLoaded', function () {

  chrome.storage.local.get(['demandware_server', 'demandware_username', 'demandware_password', 'demandware_blade_1', 'demandware_blade_2'], function(items) {
    $('#server').val(items.demandware_server);
    $('#username').val(items.demandware_username);
    $('#password').val(items.demandware_password);
    $('#blade-1').val(items.demandware_blade_1);
    $('#blade-2').val(items.demandware_blade_2);
    console.log(items);
  });

  $('#save').on('click', function() {

    var username = $('#username').val(),
        server = $('#server').val(),
        password = $('#password').val(),
        blade_1 = $('#blade-1').val(),
        blade_2 = $('#blade-2').val();

    chrome.storage.local.set({
      'demandware_server' : server, 
      'demandware_username' : username, 
      'demandware_password' : password,
      'demandware_blade_1' : blade_1,
      'demandware_blade_2' : blade_2}, function() {

      console.log('Save settings');

      // Check if settings are valid
    });

    return false;
  });
});