$(document).ready(function() {
    var table = $('#pickle').DataTable({
        "columnDefs": [{
            processing: true,
            serverSide: true,
            //pageResize: true,
            //paging: true,
            //lengthChange: true,
            order: [
                [0, "desc"]
            ],
            iDisplayLength: 25,
            ajax: {
                url: '/index/processing_queue'
            },
            dom: 'Bfrtip',
            buttons: [{
                text: 'Reload',
                action: function(e, dt, node, config) {
                    dt.ajax.reload();
                }
            }],

            "render": function(data, type, row) {
                if (data == '') {
                    return data;
                }
                return moment(data).fromNow();
            },
            "targets": [2, 3],
        }]
    });

    table.buttons().container()
        .insertBefore('#pickle_filter');
});