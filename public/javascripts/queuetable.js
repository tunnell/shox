$(document).ready(function() {
    var table = $('#pickle').DataTable({
 
            //processing: true,
            //serverSide: true,
            //processing: true,
            //paging: true,
            ajax: {
                url:'processing_queue_table',
                //url: 'https://datatables.net/examples/ajax/data/arrays_custom_prop.txt',
                //type: "POST",
                //                "dataSrc": "data",
            },
            columns: [
                      //{ "data": "payload.name" , name: "run name"},
    { "data": "payload.number" , title: "Run number"},
    { "data" : "priority", title : "Priority", fieldInfo: 'Larger values mean more priority'},
    { "data" : "createdOn", title: "Created", type: 'datetime',
      format: 'DD.MM.YYYY hh:mm',},
    { "data" : "startTime", title: "Started", type: 'datetime'}
                      ],

            order: [
                    [1, "desc"],
                    [2, "desc"],
            ],

            dom: 'Bfrtip',  // outside
            
            buttons: [{  // outside
               text: 'Reload',
                action: function(e, dt, node, config) {
                    dt.ajax.reload();
                }
            }],
            //            columnDefs: [{'
            //                         ]
                   "columnDefs": [{ 
                        "render": function(data, type, row) {
                            if (data == null) {
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