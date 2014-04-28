function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

var username = 'devadmin',
      password = 'sofia2010';


function do_notifications() {

  var d = new Date(), year = d.getFullYear(), month = ('0' + (d.getMonth()+1)).slice(-2),date = d.getDate();

  $.ajax({
    type: "GET",
    url: "https://dev30.web03.ecommera.demandware.net/on/demandware.servlet/webdav/Sites/Logs/error-blade1-2-appserver-" + year + month + date + ".log",
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

 do_notifications();

});
