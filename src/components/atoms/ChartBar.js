import React, { useLayoutEffect, useRef } from "react";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function ChartBar({ data, id, title }) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    // Create chart instance
    let chartBar = am4core.create(id, am4charts.XYChart);

    chartBar.marginRight = 400;

    // Add data
    chartBar.data = data;

    // Create axes Bar
    let categoryAxis = chartBar.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "status";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;

    let titleChart = chartBar.titles.create();
    titleChart.text = title;
    titleChart.fontSize = 20;
    titleChart.marginBottom = 30;
    titleChart.align = "center";

    let valueAxis = chartBar.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Jumlah Karyawan / (Direktorat)";
    valueAxis.title.fontWeight = 200;

    // Create series
    let series = chartBar.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "hadir";
    series.dataFields.categoryX = "status";
    series.name = "Hadir";
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.stacked = true;

    let series2 = chartBar.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "tidak hadir";
    series2.dataFields.categoryX = "status";
    series2.name = "Tidak Hadir";
    series2.tooltipText = "{name}: [bold]{valueY}[/]";
    series2.stacked = true;

    let series3 = chartBar.series.push(new am4charts.ColumnSeries());
    series3.dataFields.valueY = "terlambat";
    series3.dataFields.categoryX = "status";
    series3.name = "Terlambat";
    series3.tooltipText = "{name}: [bold]{valueY}[/]";
    series3.stacked = true;

    let series4 = chartBar.series.push(new am4charts.ColumnSeries());
    series4.dataFields.valueY = "keterangan";
    series4.dataFields.categoryX = "status";
    series4.name = "Keterangan";
    series4.tooltipText = "{name}: [bold]{valueY}[/]";
    series4.stacked = true;
    // End axes Bar -===========================

    // Add cursor
    chartBar.cursor = new am4charts.XYCursor();

    // ...
    chart.current = chartBar;

    return () => {
      chartBar.dispose();
    };
  }, [data, id, title]);

  return (
    <div
      className="font-semibold bg-white py-4 text-sm rounded-lg overflow-clip truncate antialiased h-96 w-full"
      id={id}></div>
  );
}
