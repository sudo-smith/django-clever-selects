(function($) {
        $.fn.loadChildChoices = function(child) {
            var valuefield = child;
            var ajax_url = valuefield.attr('ajax_url');
            var empty_label = valuefield.attr('empty_label') || '--------';

            $.get(
                ajax_url,
                {
                    field: valuefield.attr('name'),
                    parent_field: $(this).attr('name'),
                    parent_value: $(this).val()
                },
                function(j) {
                    var options = '';
                    console.log(child);
                    if (!child[0].hasAttribute('multiple'))
                        options += '<option value="">' + empty_label + '</option>';
                    for (var i = 0; i < j.length; i++) {
                        options += '<option value="' + j[i][0] + '">' + j[i][1] + '</option>';
                    }
                    valuefield.html(options);
                    valuefield.trigger('change');
                    valuefield.trigger("liszt:updated"); // support for chosen versions < 1.0.0
                    valuefield.trigger("chosen:updated"); // support for chosen versions >= 1.0.0
                },
                "json"
            );
        };

        $.fn.loadAllChainedChoices = function() {
            var chained_ids = $(this).attr('chained_ids').split(",");

            for (var i = 0; i < chained_ids.length; i++) {
                var chained_id = chained_ids[i];

                $(this).loadChildChoices($('#' + chained_id));
            }
        };
})(jQuery || django.jQuery);

/*function loadChildChoices(parentField, child) {
    var valueField = child;
    var ajaxUrl = valueField.getAttribute("ajax_url");
    var emptyLabel = valueField.getAttribute('empty_label') || '--------';

    var headers = new Headers();
    headers.append("Accept", "application/json");

    var request = new Request(
        ajaxUrl + "?field=" + valueField.getAttribute("name") + "&parent_field=" + parentField.getAttribute("name") + "&parent_value=" + parentField.value,
        {method: "GET", headers: headers}
    );

    fetch(request).then(function(response) {
        return response.json();
    }).then(function(options) {
        var optionsHTML = "";

        if (!child[0].hasAttribute("multiple")) {
            optionsHTML += '<option value="">' + emptyLabel + '</option>';
        }

        options.forEach(function(option) {
            optionsHTML += '<option value="' + option[0] + '">' + option[1] + '</option>';
        });

        valueField.innerHTML = optionsHTML;
        valueField.dispatchEvent(new Event("change"));
        valueField.dispatchEvent(new Event("load"));
        valueField.dispatchEvent(new Event("liszt:updated")); // support for chosen versions < 1.0.0
        valueField.dispatchEvent(new Event("chosen:updated")); // support for chosen versions >= 1.0.0
    });
};

function loadAllChainedChoices(parentField) {
    var chained_ids = parentField.getAttribute('chained_ids').split(",");

    chained_ids.forEach(function(chained_id) {
        var child = document.getElementById(chained_id);
        loadChildChoices(parentField, child);
    });
};*/
