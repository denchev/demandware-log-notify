document.addEventListener('DOMContentLoaded', function () {

  chrome.storage.local.get(settings_list, function(items) {

    for(var i = 0, n = settings_list.length; i < n; i+=1) {
      var field = $('#' + settings_list[i]);

      if(field.attr('type') == 'checkbox') {
        if(items[settings_list[i]]) {
          field.attr('checked', true);
        }
      } else {

        $('#' + settings_list[i]).val(items[settings_list[i]]);
      }
    }
  });

  $('#save').on('click', function() {

    var save_settings_list = {};

    for(var i = 0, n = settings_list.length; i < n; i+=1) {

      var field = $('#' + settings_list[i]),
          val = null;

      if(field.attr('type') == 'checkbox') {
        val = field.is(':checked');
      } else {
        val = field.val();
      }

      save_settings_list[settings_list[i]] = val;
    }

    chrome.storage.local.set(save_settings_list, function() {

      console.log('Save settings_list');
    });

    return false;
  });
});