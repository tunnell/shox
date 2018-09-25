function plot_datasize(data) {
    Highcharts.chart('container', {
        exporting: {
            showTable: true
        },
        credits: false,
        chart: {
            type: 'column'
        },
        title: {
            text: 'Data volume across sites'
        },
        subtitle: {
            text: 'Click the columns to view types of data available',
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Data volume [GB]',
            },
            type: 'logarithmic',

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f} GB'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} GB</b><br/>'
        },

        "series": [{
            "name": "Data volume [GB]",
            "colorByPoint": true,
            "data": docs,

        }],
    })
};