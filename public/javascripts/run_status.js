$(document).ready(function() {
    $('#pickle').DataTable({
        dom: 'Bfrtip',
        select: true,

        buttons: [
            'copy', 'excel', 'pdf',
            'selectAll', 'selectNone',

        ]
    })
});