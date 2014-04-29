function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

function do_notifications() {

  var d = new Date(), year = d.getFullYear(), month = ('0' + (d.getMonth()+1)).slice(-2),date = d.getDate();

  var server = StorageArea.get('demandware_server'),
      username = StorageArea.get('demandware_username'),
      password = StorageArea.get('demandware_password');

  $.ajax({
    type: "GET",
    url: "https://" + server + "/on/demandware.servlet/webdav/Sites/Logs/error-blade1-2-appserver-" + year + month + date + ".log",
    beforeSend: function (xhr){ 
        xhr.setRequestHeader('Authorization', make_base_auth(username, password)); 
    },
    error : function() {
      console.log('File does not exists.');
    },
    success: function (response){
      console.log('File exists.');
      var regex = new RegExp(/\[\d+\-\d+\-\d+ \d+:\d+:\d+\.\d+ GMT]/);

      var errors = response.split(regex);
      var date = new Date();
      var notifId = "demandware_" + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + errors.length + Math.random();

      chrome.notifications.create(notifId, {
        title : "New error",
        message : errors.pop(),
        type : "basic",
        iconUrl : "icon.png"
      }, function() {
        console.log('Creation callback');
      });
    }
  });

}

document.addEventListener('DOMContentLoaded', function () {

  $('#save').on('click', function() {

    var username = $('#username'),
        server = $('#server'),
        password = $('#password');

    chrome.storage.sync.set({'demandware_server' : server, 'demandware_username' : username, 'demandware_password' : password}, function() {
      console.log('Save settings');
    });

    return false;
  });

 do_notifications();

 chrome.alarms.create('demandware_realtime', {
  periodInMinutes : 1,
  delayInMinutes : 1
 });

 chrome.alarms.onAlarm.addListener(function(alarm) {
  if(alarm.name == 'demandware_realtime') {
    do_notifications();
  }
 });

});
