// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  //chrome.alarms.create("nightWatcher", {});

  var req = new XMLHttpRequest();
  req.open('GET', 'https://dev30.web03.ecommera.demandware.net/on/demandware.servlet/webdav/Sites/Logs/error-blade1-2-appserver-20140428.log', true);
  req.onload = function() {
    
    var regex = new RegExp(/\[\d+\-\d+\-\d+ \d+:\d+:\d+\.\d+ GMT]/);

   var errors = this.responseText.split(regex);
   var notifId = "demandware_" + parseInt( Math.random()*100000000 );

   chrome.notifications.create(notifId, {
    title : "New error",
    message : errors.pop(),
    type : "basic",
    iconUrl : "icon.png"
   }, function() {
    console.log('Creation callback');
   });
  }
  req.send(null);

  //chrome.alarms.create("alarm_id", {
  //  delayInMinutes : 1,
  //  periodInMinutes : 1
 // });
});
