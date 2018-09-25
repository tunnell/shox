$('button').on('click', function() {
    $.ajax({
        type: 'POST',
        url: '/send',
        data: {
            ID: 'someid'
        },
        success: function(resultData) {
            alert(resultData);
        }
    });
});


$(document).ready(function() {
    var table = $('#pickle').DataTable({

        dom: 'Bfrtip',
        select: true,
        buttons: [
            'selectAll', 'selectNone', {
                extend: 'selected',
                text: 'Count selected rows',
                action: function(e, dt, button, config) {
                    alert(dt.rows({
                        selected: true
                    }).indexes().length + ' row(s) selected');
                    $.ajax({
                        type: 'POST',
                        url: '/send',
                        data: {
                            ID: 'someid'
                        },
                        success: function(resultData) {
                            alert(resultData);
                        }
                    });
                }
            }
        ],
        "columnDefs": [{
            "render": function(data, type, row) {
                return moment(data).fromNow();
            },
            "targets": [1, 2, 4]
        }]
    })
})