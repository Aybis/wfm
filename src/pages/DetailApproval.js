import Textarea from 'components/devices/universal/atoms/Textarea';
import CardApprover from 'components/devices/universal/molecules/CardApprover';
import CardMapsInOut from 'components/devices/universal/molecules/CardMapsInOut';
import CardTime from 'components/devices/universal/molecules/CardTime';
import CardTitlePage from 'components/devices/universal/molecules/CardTitlePage';
import LabelValueHorizontal from 'components/devices/universal/molecules/LabelValueHorizontal';
import { useEffect } from 'react';

const DetailApproval = ({ history }) => {
  const markOne = [
    {
      address:
        'Perumahan Bintang Alam Blok G4 no 10, Telukjambe, East Telukjambe, Karawang Regency, West Java 41361, Indonesia',
      longLat: {
        lat: -6.336465,
        lng: 107.323785,
      },
    },
    {
      address:
        'Perumahan Bintang Alam Blok Mana Gatau Pokoknya no 10, Telukjambe, East Telukjambe, Karawang Regency, West Java 41361, Indonesia',
      longLat: {
        lat: -6.335384,
        lng: 107.3233028,
      },
    },
  ];

  const onSubmit = () => {
    alert('Approve');
  };

  const onReject = () => {
    alert('Reject');
  };

  const dataApproval = [
    {
      name: 'Abdul Muchtar Astria',
      date: '15, Desember 2021',
      time: '02:12 PM',
      image: null,
      status: true,
    },
    {
      name: 'Junaidi Abdillah',
      date: '15, Desember 2021',
      time: '02:12 PM',
      image: null,
      status: true,
    },
    {
      name: 'Regina Lenggogeni',
      date: '15, Desember 2021',
      time: '02:12 PM',
      image: null,
      status: false,
    },
  ];

  const reportTime = [
    {
      title: 'in',
      time: '19 : 03',
    },
    {
      title: 'out',
      time: '24 : 53',
    },
    {
      title: 'ovt',
      time: '05 : 50',
    },
  ];

  useEffect(() => {
    window.scroll(0, 10);
  }, []);

  return (
    <div className="relative -mb-20">
      <CardTitlePage goBack={history.goBack} title="Detail Lemburan" />

      <div className="flex flex-col mt-8 gap-4 lg:gap-6">
        {/* Card Map  */}
        <div className="flex flex-col w-full bg-white p-4 rounded-md">
          <h1 className="font-semibold text-apps-text mb-4">
            Overtime Locations
          </h1>
          <div className="rounded-md">
            <CardMapsInOut mark={markOne} className="w-full min-h-full h-96" />
          </div>
        </div>
        {/* End Card Map */}
        {/* Card Detail Lemburan  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col justify-between bg-white rounded-md">
            <div className="flex flex-col gap-3 p-4">
              <h1 className="font-semibold text-apps-text mb-4">
                Overtime Summary
              </h1>
              <LabelValueHorizontal label="Nama" value="Abdul Muchtar Astria" />
              <LabelValueHorizontal label="Tanggal" value="Rabu, 17 May 2021" />
              <LabelValueHorizontal
                label="Posisi"
                value="Front End Developer"
              />
              <LabelValueHorizontal
                label="Subject"
                value="Create Design and FE Almuazaf"
              />
              <LabelValueHorizontal
                label="Deskripsi"
                value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              perspiciatis nam labore officia, nulla vel sequi! Dolor nisi ad
              quaerat quae. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Harum perspiciatis nam labore officia, nulla vel sequi!
              Dolor nisi ad quaerat quae."
              />
            </div>
            <div className="flex justify-between gap-3 mt-2 p-4 lg:px-12 bg-coolGray-50 rounded-b-md">
              {reportTime.map((item, index) => (
                <CardTime key={index} time={item.time} title={item.title} />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between bg-white rounded-md">
            <div className="grid grid-cols-1 gap-4 p-4">
              <h1 className="font-semibold text-apps-text mb-2">
                Overtime Approval
              </h1>
              {dataApproval.map((item, index) => (
                <CardApprover
                  key={index}
                  date={item.date}
                  image={item.image}
                  name={item.name}
                  status={item.status}
                  time={item.time}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col rounded-md lg:col-start-1 lg:col-end-3 bg-white p-4">
            <Textarea
              inputClassName="W-full"
              labelName="Comment"
              placeholder="Oke..."
            />

            <div className="mt-2">
              <button
                className="uppercase bg-apps-red p-2 rounded-bl-md text-white font-semibold h-10 rounded w-28"
                onClick={onReject}>
                Reject
              </button>
              <button
                className="ml-2 uppercase bg-apps-primary p-2 rounded text-white font-semibold h-10 w-28"
                onClick={onSubmit}>
                Approve
              </button>
            </div>
          </div>
        </div>
        {/* End Card Detail Lemburan  */}
      </div>
    </div>
  );
};

export default DetailApproval;
