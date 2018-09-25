function plot_status(data) {
    Highcharts.chart('container', {
        exporting: {
            showTable: true
        },
        credits: false,
        chart: {
            type: 'column'
        },
        title: {
            text: 'Availability percentage for different data types',
        },
        subtitle: {
            text: "Only applies to SR1 tagged runs",
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Run availability [%]',
            },
            'max': 100

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}%</b><br/>'
        },

        "series": [{
            "name": "Percentage of data available",
            "colorByPoint": true,
            "data": docs

        }],
    })
};