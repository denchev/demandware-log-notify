function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

document.addEventListener('DOMContentLoaded', function () {

  var username = 'devadmin',
      password = 'sofia2010'

  $.ajax
({
  type: "GET",
  url: "https://dev30.web03.ecommera.demandware.net/on/demandware.servlet/webdav/Sites/Logs/error-blade1-2-appserver-20140428.log",
  beforeSend: function (xhr){ 
        xhr.setRequestHeader('Authorization', make_base_auth(username, password)); 
    },
  success: function (response){
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

  //chrome.alarms.create("alarm_id", {
  //  delayInMinutes : 1,
  //  periodInMinutes : 1
 // });
});
