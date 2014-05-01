var settings = {};

function start_watch(log_type) {
  var d = new Date(), year = d.getFullYear(), month = ('0' + (d.getMonth()+1)).slice(-2),date = d.getDate();

  $.ajax({
    type: "GET",
    url: "https://" + settings.server + logs_path + log_type + "-blade" + settings['blade-1'] + "-" + settings['blade-2'] + "-appserver-" + year + month + date + ".log",
    beforeSend: function (xhr){ 
        xhr.setRequestHeader('Authorization', make_base_auth(settings.username, settings.password)); 
    },
    error : function() {
      console.log('File does not exists.');
    },
    success: function (response){
      console.log('File exists.');
      var regex = new RegExp(/\[\d+\-\d+\-\d+ \d+:\d+:\d+\.\d+ GMT]/);

      var errors = response.split(regex);
      var date = new Date();
      var notifId = "" + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + errors.length;

      chrome.notifications.create(notifId, {
        title : "New log change: " + log_type,
        message : errors.pop(),
        type : "basic",
        iconUrl : "icon.png"
      }, function() {
      });
    }
  });
}

function do_notifications() {

  for(var i = 0, n = logs_available.length; i < n; i+=1) {
    if(settings['log-' + logs_available[i]]) {
      start_watch(logs_available[i]);
    }
  }

}

chrome.storage.local.get(settings_list, function(_settings) {
  settings = $.extend(settings, _settings);
  do_notifications();
});

chrome.alarms.create('realtime', {
  periodInMinutes : 1,
  delayInMinutes : 1
 });

 chrome.alarms.onAlarm.addListener(function(alarm) {
  if(alarm.name == 'realtime') {
    do_notifications();
  }
 });