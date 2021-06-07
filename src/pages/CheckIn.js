/** @format */

import { LightningBoltIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Label from "components/atoms/Label";
import Select from "components/atoms/Select";
import SetMaps from "components/atoms/SetMaps";
import Textarea from "components/atoms/Textarea";
import ToastHandler from "helpers/hooks/toast";
import useForm from "helpers/hooks/useForm";
import React, { useEffect, useState } from "react";

const CheckIn = ({ history }) => {
  const [didMount, setDidMount] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);

  const [state, setState] = useForm({
    lokasi: "",
    alamat: "",
    image: "",
    kehadiran: "",
    kondisi: "",
    keterangan: "",
  });

  const inputPhoto = (event) => {
    let fileValue = event.target.files[0] ? event.target.files[0] : null;
    setImage(fileValue);
    if (fileValue) {
      let source = URL.createObjectURL(fileValue);
      setPhoto(source);
    }
  };

  const sendlongLat = (value) => {
    setlongLat(value);
  };

  const sendAddress = (value) => {
    setAddress(value);
  };

  const submitFunction = (event) => {
    event.preventDefault();
    state.lokasi = longLat;
    state.image = image;
    state.alamat = address;
    console.log(state);
    ToastHandler(
      "success",
      `Alamat : ${state.alamat},
      Kondisi : ${state.kondisi},
      Kehadiran : ${state.kehadiran},
      Keterangan : ${state.keterangan},
      Long : ${state.lokasi?.lng},
      Lat : ${state.lokasi?.lat},

      `,
    );
  };

  useEffect(() => {
    setDidMount(true);
    const timeOut = setTimeout(() => {
      setPopUp(true);
    }, 500);
    return () => {
      setDidMount(false);
      clearTimeout(timeOut);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <div className={popUp ? "pt-20" : "pt-0"}>
      <button
        onClick={history.goBack}
        className="absolute z-40 left-4 rounded-full transition-all duration-500"
        style={{ top: `${popUp ? "44%" : "11%"}` }}>
        <ChevronLeftIcon className="h-8 w-8 bg-white rounded p-1 text-apps-text" />
      </button>

      <SetMaps
        popup={popUp}
        sendlongLat={sendlongLat}
        sendAddress={sendAddress}
      />

      <div
        className={`fixed transition-all duration-500 ease-in-out bottom-0 inset-x-0 bg-apps-yellow rounded-t-xl ${
          popUp ? "h-1/2" : "h-5/6 mt-20"
        }`}>
        <div className="flex justify-between text-apps-text bg-apps-yellow  px-4 py-2 rounded-t-xl z-10">
          <div className="inline-flex">
            <LightningBoltIcon className="h-5 w-5 " />
            <h4 className="font-light text-sm ml-2">Check In</h4>
          </div>

          <ChevronDownIcon
            className={`mr-2 h-6 w-6 transform transition duration-300 rounded-full ${
              popUp ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setPopUp(!popUp)}
          />
        </div>

        <div className="flex flex-col p-4 rounded-t-xl z-10 overflow-y-auto hidden-scroll h-full bg-white">
          <form
            className="flex flex-col gap-4 mt-2 mb-12"
            onSubmit={submitFunction}>
            <div className="flex flex-col gap-2 text-sm">
              <Label labelName="Lokasi" />
              <p className="font-normal text-gray-400 w-full">{address}</p>
            </div>
            <div
              className={`grid gap-4 transition-all duration-500 ease-in-out ${
                state.kondisi !== "sehat" ? "grid-cols" : "grid-cols-2"
              } `}>
              <Select
                labelName="Kondisi"
                name="kondisi"
                border={false}
                value={state.kondisi}
                fallbackText="Pilih Kondisi"
                onClick={setState}>
                <option value="" selected disabled>
                  Pilih Kondisi
                </option>
                <option value="sehat">Sehat</option>
                <option value="sakit">Sakit</option>
                <option value="cuti">Cuti</option>
                <option value="ijin">Ijin</option>
                <option value="sppd">SPPD</option>
              </Select>

              {state.kondisi === "sehat" && (
                <Select
                  labelName="Kehadiran"
                  name="kehadiran"
                  border={false}
                  value={state.kehadiran}
                  fallbackText="Pilih Kehadiran"
                  onClick={setState}>
                  <option value="" selected disabled>
                    Pilih Kehadiran
                  </option>
                  <option value="wfh">WFH</option>
                  <option value="wfo">WFO</option>
                  <option value="satelit">Satelit</option>
                </Select>
              )}
            </div>

            {state.kondisi !== "" && state.kondisi !== "sehat" && (
              <Textarea
                labelName="Keterangan"
                name="keterangan"
                value={state.keterangan}
                onChange={setState}
                placeholder={`Alasan ${state.kondisi} ? `}
              />
            )}

            <div className="flex flex-col gap-2 text-sm ">
              <label
                htmlFor="image"
                className="text-apps-text text-opacity-70 font-semibold">
                Photo
                {photo ? (
                  <img
                    src={photo}
                    alt="file"
                    className=" rounded-lg cursor-pointer mt-2"
                  />
                ) : (
                  <UserCircleIcon
                    tabIndex="0"
                    className="h-64 w-full rounded-lg bg-gray-100 text-gray-400 p-2 cursor-pointer mt-2 pb-12"
                  />
                )}
              </label>

              <input
                type="file"
                name="image"
                accept="image/*"
                capture="camera"
                id="image"
                className="hidden"
                onChange={(event) => inputPhoto(event)}
              />
            </div>
            {photo && (
              <button className="p-3 text-lg font-semibold bg-apps-primary w-full text-center rounded-lg text-white">
                Check In
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
