import React, { useLayoutEffect, useRef } from "react";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default function ChartPie({ data, id, title }) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    // Create chart instance
    let chartPie = am4core.create(id, am4charts.PieChart);

    // Add data
    chartPie.data = data;

    // Add and configure Series Pie -==================================
    let pieSeries = chartPie.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "person";
    pieSeries.dataFields.category = "unit";
    pieSeries.dataFields.hidden = "hidden";
    pieSeries.slices.template.cornerRadius = 5;
    // pieSeries.colors.step = 3;
    pieSeries.hiddenState.properties.endAngle = -90;

    // Let's cut a hole in our Pie chart the size of 40% the radius
    chartPie.innerRadius = am4core.percent(40);

    // setting of labels
    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);
    pieSeries.legendSettings.itemValueText = ": {value}";

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // Add a legend
    chartPie.legend = new am4charts.Legend();
    chartPie.legend.position = "top";

    // end setting series chart PIE ===============================

    // Add cursor
    chartPie.legend = new am4charts.Legend();

    // ...
    chart.current = chartPie;

    return () => {
      chartPie.dispose();
    };
  }, [data, id, title]);
  return (
    <div
      className="font-semibold bg-white py-4 text-sm rounded-lg overflow-clip truncate antialiased h-96 w-full"
      id={id}></div>
  );
}
