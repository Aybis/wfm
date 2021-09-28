import Menu from 'components/devices/desktop/section/Menu';
import CardTitlePageMobile from 'components/devices/mobile/component/molecules/CardTitlePageMobile';
import Input from 'components/devices/universal/atoms/Input';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';
import Compressor from 'compressorjs';
import CardInputPhoto from 'components/devices/mobile/component/molecules/CardInputPhoto';
import { setAuthorizationHeader } from 'configs/axios';
import users from 'constants/api/users';

const PersonalData = ({ history }) => {
  const USER = useSelector((state) => state.users);
  const [isSubmit, setIsSubmit] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [loadPhoto, setloadPhoto] = useState(false);
  const [image, setImage] = useState(null);

  const session = localStorage['WFM:token']
    ? JSON.parse(localStorage['WFM:token'])
    : null;

  const [state, setState] = useForm({
    name: '',
    phone: '',
    photo: '',
    email: '',
    nik: '',
    phone: '',
    position_id: '',
  });

  const inputPhoto = (event) => {
    let file = event.target.files[0] ? event.target.files[0] : null;
    if (!file) {
      return;
    } else {
      setloadPhoto(true);
      new Compressor(file, {
        quality: 0.5,
        convertSize: 5000,
        success: (result) => {
          setPhoto(URL.createObjectURL(result));
          createImage(result);
          setloadPhoto(false);
        },
      });
    }
  };

  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handlerUpdateProfile = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    setAuthorizationHeader(`Bearer ${session.token}`);

    state.photo = image;

    users
      .updateProfile(state)
      .then((respon) => {
        console.log(respon);
        setIsSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmit(false);
      });
  };

  //   console.log(USER);

  useEffect(() => {
    window.scroll(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER]);

  return (
    <div className="relative w-full h-screen bg-warmGray-50">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${
          isDesktop && 'mt-24'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        {/* Title Page */}
        <CardTitlePageMobile title="Personal Data" link={history.goBack} />

        {/* Content */}
        <div className="relative mx-auto my-4 p-4">
          <form
            className="flex flex-col  w-full"
            onSubmit={handlerUpdateProfile}>
            {loadPhoto ? (
              <div className="flex justify-center items-center h-40">
                <LoadingCircle />
              </div>
            ) : (
              <CardInputPhoto
                photo={photo}
                typePhoto="profile"
                handlerChangPhoto={(event) => inputPhoto(event)}
              />
            )}

            <Input
              name="name"
              labelName="Nama"
              placeholder={USER?.name}
              type="text"
              onChange={setState}
              value={state.name}
            />
            <Input
              name="phone"
              labelName="Phone"
              placeholder={USER?.phone}
              type="text"
              onChange={setState}
              value={state.phone}
            />
            <Input
              name="jabatan"
              labelName="Jabatan"
              placeholder={USER?.position}
              type="text"
              onChange={setState}
              value={USER?.position ?? ''}
              inputClassName="bg-gray-100"
              readOnly={true}
            />

            <Input
              name="direkotrat"
              labelName="Direktorat"
              placeholder={USER?.direktorat}
              type="text"
              onChange={setState}
              value={USER?.direktorat ?? ''}
              inputClassName="bg-gray-100"
              readOnly={true}
            />

            <Input
              name="subunit"
              labelName="subunit"
              placeholder={USER?.subunit}
              type="text"
              onChange={setState}
              value={USER?.subunit ?? ''}
              inputClassName="bg-gray-100"
              readOnly={true}
            />

            <Input
              name="unit"
              labelName="unit"
              placeholder={USER?.unit}
              type="text"
              onChange={setState}
              value={USER?.unit ?? ''}
              inputClassName="bg-gray-100"
              readOnly={true}
            />

            <Input
              name="workplace"
              labelName="workplace"
              placeholder={USER?.workplace}
              type="text"
              onChange={setState}
              value={USER?.workplace ?? ''}
              inputClassName="bg-gray-100"
              readOnly={true}
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
  );
};

export default PersonalData;
