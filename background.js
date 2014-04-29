function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

var settings = null;

function do_notifications() {

  var d = new Date(), year = d.getFullYear(), month = ('0' + (d.getMonth()+1)).slice(-2),date = d.getDate();

  $.ajax({
    type: "GET",
    url: "https://" + settings.demandware_server + "/on/demandware.servlet/webdav/Sites/Logs/error-blade" + settings.demandware_blade_1 + "-" + settings.demandware_blade_2 + "-appserver-" + year + month + date + ".log",
    beforeSend: function (xhr){ 
        xhr.setRequestHeader('Authorization', make_base_auth(settings.demandware_username, settings.demandware_password)); 
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

chrome.storage.local.get(['demandware_server', 'demandware_username', 'demandware_password', 'demandware_blade_1', 'demandware_blade_2'], function(_settings) {
  settings = _settings;
  do_notifications();
});

chrome.alarms.create('demandware_realtime', {
  periodInMinutes : 1,
  delayInMinutes : 1
 });

 chrome.alarms.onAlarm.addListener(function(alarm) {
  if(alarm.name == 'demandware_realtime') {
    do_notifications();
  }
 });