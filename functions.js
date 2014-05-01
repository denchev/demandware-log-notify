function test_connection(callback) {
  $.ajax({
    type: "GET",
    url: "https://" + settings.server + "/on/demandware.servlet/webdav/Sites/Logs/",
    beforeSend: function (xhr){ 
        xhr.setRequestHeader('Authorization', make_base_auth(settings.username, settings.password)); 
    },
    error : function() {
      callback('error')
    },
    success: function (response){
      callback('ok');
    }
  });
}

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

function open_link_in_tab() {
  var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
}