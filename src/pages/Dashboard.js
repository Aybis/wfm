import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ExclamationIcon } from "@heroicons/react/solid";
import Heading from "components/atoms/Heading";
import FilterDate from "components/molecules/FilterDate";
import React, { useLayoutEffect, useRef } from "react";
import MobileMenu from "section/MobileMenu";

am4core.useTheme(am4themes_animated);

export default function Dashboard({ history }) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    // Create chart instance
    let chartBar = am4core.create("chartBar", am4charts.XYChart);

    chartBar.marginRight = 400;

    // Add data
    chartBar.data = [
      {
        status: "OPR",
        hadir: 200,
        keterangan: 40,
        "tidak hadir": 50,
        terlambat: 20,
      },
      {
        status: "Non. D",
        hadir: 100,
        keterangan: 10,
        "tidak hadir": 5,
        terlambat: 40,
      },
      {
        status: "MSS",
        hadir: 187,
        keterangan: 60,
        "tidak hadir": 5,
        terlambat: 120,
      },
      {
        status: "FBS",
        hadir: 130,
        keterangan: 50,
        "tidak hadir": 5,
        terlambat: 80,
      },
    ];

    // Create axes
    let categoryAxis = chartBar.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.title.align = "center";
    categoryAxis.title.valign = "top";
    categoryAxis.dataFields.category = "status";
    categoryAxis.title.text = "Absensi Direkorat";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;

    chartBar.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.title.text = "Jumlah Karyawan / (Direktorat)";

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

    // Add cursor
    chartBar.cursor = new am4charts.XYCursor();

    // ...
    chart.current = chartBar;

    return () => {
      chartBar.dispose();
    };
  }, []);

  return (
    <div className="relative bg-coolGray-50  min-h-screen h-full">
      <div className="relative h-full min-h-screen p-6 pb-32">
        <MobileMenu />
        <div className="relative mt-4 p-4">
          <h2 className="text-apps-text font-semibold text-xl">
            Dashboard Presensi
          </h2>
        </div>
        <FilterDate />

        <div className="flex flex-col mt-8">
          <Heading heading="Presensi Daily" />
          <div className="overflow-x-auto hidden-scroll flex gap-4 mt-4 -ml-6 -mr-3 pl-6 pr-6">
            {/* card daily */}
            {Array.from(Array(6), (item, index) => (
              <div
                key={index}
                className={`flex flex-none flex-col rounded-lg w-40 gap-4 p-4 bg-white`}>
                <div className="flex flex-col items-start gap-4">
                  <ExclamationIcon className="h-10 w-10 rounded-md text-apps-orange bg-apps-orange bg-opacity-10 p-2" />
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-apps-text">Terlambat</h4>
                    <h6 className="text-apps-text text-opacity-40 text-sm">
                      123 Person
                    </h6>
                  </div>
                </div>
              </div>
            ))}
            {/* end card daily */}
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <Heading heading="Direktorat" />
          <div className="grid gap-4 mt-4">
            <div
              className="text-apps-blue font-semibold bg-white py-4 text-sm rounded-lg overflow-clip truncate antialiased h-96"
              id="chartBar"
              style={{
                width: "100%",
              }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
