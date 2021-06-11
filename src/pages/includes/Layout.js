import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { BellIcon, LogoutIcon } from "@heroicons/react/outline";
import {
  ChartBarIcon,
  ClipboardListIcon,
  DotsVerticalIcon,
  ExclamationIcon,
  HomeIcon,
  UserRemoveIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import React, { useLayoutEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

am4core.useTheme(am4themes_animated);

export default function Layout() {
  const chart = useRef(null);

  useLayoutEffect(() => {
    // Create chart instance
    let chartBar = am4core.create("chartBar", am4charts.XYChart);

    chartBar.marginRight = 400;

    // Add data
    chartBar.data = [
      {
        status: "OPERATION",
        hadir: 200,
        keterangan: 40,
        "tidak hadir": 50,
        terlambat: 20,
      },
      {
        status: "NON DIREKTORAT",
        hadir: 100,
        keterangan: 10,
        "tidak hadir": 5,
        terlambat: 40,
      },
      {
        status: "MARKETING & SALES",
        hadir: 187,
        keterangan: 60,
        "tidak hadir": 5,
        terlambat: 120,
      },
      {
        status: "FINANCE & BUSINESS SUPPORT",
        hadir: 130,
        keterangan: 50,
        "tidak hadir": 5,
        terlambat: 80,
      },
    ];

    //console.log('chart', chart);

    // Create axes
    let categoryAxis = chartBar.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.title.align = "center";
    categoryAxis.title.valign = "top";
    categoryAxis.dataFields.category = "status";
    categoryAxis.title.text = "Report Absensi Direkorat Harian";
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
    <div className="flex gap-4 bg-coolGray-50 h-screen max-h-full">
      {/* Start Navbar */}
      <nav className="transition-all duration-300 ease-in-out fixed flex rounded-2xl z-50 bottom-12 h-20 inset-x-0 mx-8 md:bottom-0 md:h-auto md:inset-y-0 md:w-32 md:flex-col md:justify-between bg-white md:my-4 md:ml-4 ">
        <div className="hidden md:flex flex-col items-center gap-2 justify-center p-2 pt-8">
          <img
            className="h-8 w-8"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="logo"
          />
          <h1 className="text-apps-text font-semibold text-lg">APP Name</h1>
        </div>
        <div className="flex md:flex-col p-2 md:gap-8 md:justify-center justify-between items-center transition-all duration-300 ease-in-out w-full">
          <NavLink
            to="/"
            exact={true}
            className=" p-2 text-center text-apps-primary text-opacity-20 rounded-md hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-bold ">
            <HomeIcon className="h-6 w-6 mx-auto" />
            <p className="text-sm mt-1">Home</p>
          </NavLink>
          <NavLink
            to="/modules"
            className=" p-2 text-center text-apps-primary text-opacity-20 rounded-md hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <ViewGridIcon className="h-6 w-6 mx-auto" />
            <p className="text-sm mt-1">Mdodules</p>
          </NavLink>
          <NavLink
            to="/approval"
            className=" p-2 text-center text-apps-primary text-opacity-20 rounded-md hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <ClipboardListIcon className="h-6 w-6 mx-auto" />
            <p className="text-sm mt-1">Approval</p>
          </NavLink>
          <NavLink
            to="/dashboard"
            className=" p-2 text-center text-apps-primary text-opacity-20 rounded-md hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <ChartBarIcon className="h-6 w-6 mx-auto" />
            <p className="text-sm mt-1">Dashboard</p>
          </NavLink>
        </div>
        <div className="hidden md:flex items-center gap-1 p-4 text-apps-text text-opacity-40">
          <LogoutIcon className="h-8 w-8 p-1" />
          <h4 className="font-light">Logout</h4>
        </div>
      </nav>
      {/* End Navbar */}

      {/* Start Main Content */}
      <div className="fixed inset-y-0 bg-coolGray-50 md:left-36 m-4 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-24">
        {/* Start Header */}
        <header className="flex justify-between top-0 inset-x-0  mb-12">
          <div className="flex gap-1 items-center">
            <h1 className="md:block hidden text-apps-text text-opacity-40">
              Kamis, 10 Juni 2021
            </h1>
            <div className="md:hidden flex flex-col">
              <h1 className="text-apps-text font-semibold">
                Abdul Muchtar Astria
              </h1>
              <h1 className="text-apps-text text-opacity-40">IT Programmer</h1>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="grid grid-cols-1">
              <BellIcon className="h-8 w-8 p-1 text-apps-text " />
              <span className="h-2 w-2 rounded-full bg-apps-red absolute ml-4 mt-1"></span>
            </div>
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="avatar"
              className="h-12 w-12 rounded-full border"
            />
          </div>
        </header>
        {/* End Header */}

        {/* Start Content */}
        <div className="flex flex-col gap-4 mb-12">
          <div className="relative h-full overflow-auto">
            <h1 className="text-apps-text text-xl font-semibold">Notes</h1>
            <div className="grid sm:grid-cols-2 gap-4 ">
              <div className="flex items-center p-2 bg-white rounded-lg ">
                <ExclamationIcon className="h-12 w-12 rounded-md text-apps-orange bg-apps-orange bg-opacity-10 p-2" />
                <div className="flex justify-between items-center w-11/12 ml-4">
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-apps-text text-lg">
                      Terlambat
                    </h4>
                    <h6 className="text-apps-text">123 Person</h6>
                  </div>
                  <DotsVerticalIcon className="h-6 w-6 text-apps-text text-opacity-40" />
                </div>
              </div>
              <div className="flex items-center p-2 bg-white rounded-lg ">
                <UserRemoveIcon className="h-12 w-12 rounded-md text-apps-red bg-apps-red bg-opacity-10 p-2" />

                <div className="flex justify-between items-center w-11/12 ml-4">
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-apps-text text-lg">
                      Tidak Hadir
                    </h4>
                    <h6 className="text-apps-text">123 Person</h6>
                  </div>
                  <DotsVerticalIcon className="h-6 w-6 text-apps-text text-opacity-40" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-12">
            <h1 className="text-apps-text font-semibold text-xl">
              Report Presensi Daily
            </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  gap-4 ">
              {Array.from(Array(6), (item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white p-2 rounded-lg ">
                  <HomeIcon className="h-12 w-12 rounded-md text-apps-primary bg-apps-primary bg-opacity-10 p-2" />
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-apps-text text-lg">
                      WFH
                    </h4>
                    <h6 className="text-apps-text">123 Person</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-12">
            <h1 className="text-apps-text font-semibold text-xl">
              Report Direktorat Daily
            </h1>
            <div className="grid gap-4">
              <div
                className="text-apps-blue font-semibold bg-white p-4 rounded-lg overflow-clip truncate antialiased"
                id="chartBar"
                style={{
                  width: "100%",
                  height: "500px",
                }}></div>
            </div>
          </div>
        </div>
        {/* End Content */}
      </div>
      {/* End Main Content */}
    </div>
  );
}
