import Input from 'components/devices/universal/atoms/Input';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';

const PersonalData = ({ history }) => {
  const USER = useSelector((state) => state.users);
  const [isSubmit, setIsSubmit] = useState(false);

  const [state, setState] = useForm({
    user_id: null,
    name: '',
    phone: '',
    photo: '',
  });

  const handlerUpdateProfile = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.scroll(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER]);

  return (
    <div className="relative w-full h-screen bg-coolGray-100">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${
          isDesktop && 'mt-24'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        {/* Title Page */}
        <CardTitlePageMobile title="Personal Data" link={history.goBack} />

        {/* Content */}
        <div className="relative mx-auto my-4 mt-8 p-4 bg-gradient-to-b from-coolGray-50 to-white rounded-b-lg">
          <div className="flex flex-col gap-2 justify-center items-center">
            {USER?.image_url ? (
              <img
                loading="lazy"
                height={10}
                width={10}
                src={USER?.image_url}
                alt="avatar"
                className="h-32 w-32 rounded-lg shadow-lg"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${USER?.name}&background=0062FF&color=fff`}
                alt="avatar"
                loading="lazy"
                height={10}
                width={10}
                className="h-32 w-32 rounded-lg"
              />
            )}
            <h1 className="capitalize text-gray-800 font-semibold mt-4">
              {USER?.name?.toLowerCase()}
            </h1>
            <h2 className="capitalize -mt-1 text-gray-400 text-xs text-center">
              {USER?.position}
            </h2>
          </div>

          <div className="relative my-4">
            <form
              className="flex flex-col w-full mt-6"
              onSubmit={handlerUpdateProfile}>
              <Input
                name="name"
                labelName="Nama"
                placeholder={USER?.name}
                type="text"
                onChange={setState}
                value={state.name}
              />

              {isSubmit ? (
                <div className="flex items-center justify-center">
                  <LoadingCircle />
                </div>
              ) : (
                <button className="hover:from-pink-700 hover:to-red-600 transition-all duration-300 ease-in-out bg-gradient-to-br from-pink-600 to-red-500 text-white rounded-md p-2 text-lg md:p-4 md:text-2xl tracking-wider font-semibold mt-4 w-full">
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
