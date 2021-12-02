import { HeartIcon } from '@heroicons/react/outline';
import { PencilIcon } from '@heroicons/react/solid';
import Menu from 'components/devices/desktop/section/Menu';
import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import MobileMenu from 'components/devices/mobile/sections/MobileMenu';
import { setAuthorizationHeader } from 'configs/axios';
import absensi from 'constants/api/absensi';
import React, { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';

export default function Profile({ history }) {
  const USER = useSelector((state) => state.users);
  const session = JSON.parse(localStorage.getItem('WFM:token'));
  const [dataTeamMate, setdataTeamMate] = useState([]);
  const [dataAtasan, setdataAtasan] = useState(null);
  const [didMount, setDidMount] = useState(false);

  const getAtasan = async (id) => {
    let result;
    return absensi
      .atasan({
        params: {
          position_id: id,
        },
      })
      .then((response) => {
        response.data.map(
          (item) =>
            (result = {
              position: item.atasan.name,
              id: item.atasan.users[0].id,
              name: item.atasan.users[0].name,
              image: item.atasan.users[0].image
                ? item.atasan.users[0].image.image_url
                : `https://ui-avatars.com/api/?name=${item.atasan.users[0].name}&background=F3F3F3&color=000`,
              absen: item.atasan.users[0].absen_today
                ? item.atasan.users[0].absen_today.detail_absensi[0].jam
                : null,
            }),
        );
        return result;
      })
      .catch((error) => {
        console.log('atasan error', error.response);

        return error;
      });
  };

  const collectBawahan = async (id) => {
    let result;
    return absensi
      .bawahan({
        params: {
          position_id: id,
        },
      })
      .then((response) => {
        response.data.map(
          (item) =>
            (result = {
              atasan_id: item.atasan_id,
              bawahan: item.bawahan,
            }),
        );
        return result;
      })
      .catch((error) => {
        console.log('bawahan error', error.response);
      });
  };

  const getDataAtasan = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);
    getAtasan(USER?.position_id).then(function (response) {
      setdataAtasan(response);
    });
    collectBawahan(USER?.position_id).then(function (response) {
      if (response.bawahan.length > 0) {
        let dataBawahan = [];
        response.bawahan.map((listPosition) =>
          listPosition.users.map((user) =>
            dataBawahan.push({
              position: listPosition.name,
              id: user.id,
              name: user.name,
              image: user.image
                ? user.image.image_url
                : `https://ui-avatars.com/api/?name=${user.name}&background=F3F3F3&color=000`,
              absen: user.absen_today
                ? user.absen_today.detail_absensi[0].jam
                : null,
            }),
          ),
        );
        setdataTeamMate(dataBawahan);
      } else {
        collectBawahan(response.atasan_id).then((success) => {
          let dataBawahan = [];

          success.bawahan.map((listPosition) =>
            listPosition.users.map((user) =>
              dataBawahan.push({
                position: listPosition.name,
                id: user.id,
                name: user.name,
                image: user.image
                  ? user.image.image_url
                  : `https://ui-avatars.com/api/?name=${user.name}&background=F3F3F3&color=000`,
                absen: user.absen_today
                  ? user.absen_today.detail_absensi[0].jam
                  : null,
              }),
            ),
          );
          setdataTeamMate(dataBawahan);
        });
      }
    });
  };

  useEffect(() => {
    getDataAtasan();
    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER]);

  if (!didMount) {
    return null;
  }

  return USER ? (
    <div className="relative w-full h-screen bg-coolGray-50">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${
          isDesktop && 'mt-24'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        <MobileMenu />

        <div className="pb-16 space-y-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
            <div className="flex justify-center items-center w-full mt-6 rounded-lg overflow-hidden">
              {USER?.image_url ? (
                <img
                  loading="lazy"
                  height={10}
                  width={10}
                  src={USER?.image_url}
                  alt="avatar"
                  className="h-64 w-full rounded-lg shadow-lg object-cover"
                />
              ) : (
                <img
                  src={`https://ui-avatars.com/api/?name=${USER?.name}&background=0062FF&color=fff`}
                  alt="avatar"
                  loading="lazy"
                  height={10}
                  width={10}
                  className="h-64 w-full rounded-lg object-cover"
                />
              )}
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900 capitalize">
                  <span className="sr-only">Details for </span>
                  {USER?.name.toLowerCase()}
                </h2>
                <p className="text-sm font-medium text-gray-500">
                  {USER?.email}
                </p>
              </div>
              <button
                type="button"
                className="ml-4 h-8 w-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <HeartIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Favorite</span>
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Information</h3>
            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Fullname</dt>
                <dd className="text-gray-900 capitalize">
                  {USER?.name.toLowerCase()}
                </dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">NIK</dt>
                <dd className="text-gray-900 capitalize">{USER?.nik}</dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Position</dt>
                <dd className="text-gray-900 capitalize">
                  {USER?.position.toLowerCase()}
                </dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Sub Unit</dt>
                <dd className="text-gray-900 capitalize">
                  {USER?.subunit.toLowerCase()}
                </dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Unit</dt>
                <dd className="text-gray-900 capitalize">
                  {USER?.unit.toLowerCase()}
                </dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Direktorat</dt>
                <dd className="text-gray-900 capitalize">
                  {USER?.direktorat.toLowerCase()}
                </dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Phone</dt>
                <dd className="text-gray-900 capitalize">{USER?.phone}</dd>
              </div>
              <div className="py-3 flex justify-between text-sm font-medium">
                <dt className="text-gray-500">Workplace</dt>
                <dd className="text-gray-900 capitalize">
                  {USER?.workplace.toLowerCase()}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Bio</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 italic">
                Add a description to this bio.
              </p>
              <button
                type="button"
                className="-mr-2 h-8 w-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Add description</span>
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Our Team</h3>
            <ul className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
              {dataAtasan && (
                <li className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={dataAtasan.image}
                      alt={dataAtasan.image}
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="ml-4 text-sm font-medium text-gray-900 capitalize">
                      {dataAtasan.name.toLowerCase()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('soon')}
                    className="ml-6 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Preview<span className="sr-only"> Aimee Douglas</span>
                  </button>
                </li>
              )}
              {dataTeamMate &&
                dataTeamMate.map((team) => (
                  <li
                    key={team.id}
                    className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={team.image}
                        alt={team.image}
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="ml-4 text-sm font-medium text-gray-900 capitalize">
                        {team.name.toLowerCase()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert('soon')}
                      className="ml-6 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Preview
                      <span className="sr-only capitalize">
                        {' '}
                        {team.name.toLowerCase()}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <CardLoading />
  );
}
