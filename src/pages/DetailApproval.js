import CardGridDekstop from 'components/devices/desktop/molecules/CardGridDekstop';
import Menu from 'components/devices/desktop/section/Menu';
import HeadingMobile from 'components/devices/mobile/component/atoms/HeadingMobile';
import Card from 'components/devices/mobile/component/molecules/Card';
import CardTitlePageMobile from 'components/devices/mobile/component/molecules/CardTitlePageMobile';
import Textarea from 'components/devices/universal/atoms/Textarea';
import CardApprover from 'components/devices/universal/molecules/CardApprover';
import CardMapsInOut from 'components/devices/universal/molecules/CardMapsInOut';
import CardTime from 'components/devices/universal/molecules/CardTime';
import LabelValueHorizontal from 'components/devices/universal/molecules/LabelValueHorizontal';
import useForm from 'helpers/hooks/useForm';
import { useEffect } from 'react';
import { isDesktop } from 'react-device-detect';

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

  const [state, setState] = useForm({
    keterangan: '',
  });

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
    <div className="flex w-full min-h-screen h-full bg-coolGray-100">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 pb:20 lg:pb-10 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-14 md:pb-4 hidden-scroll ${
          isDesktop && 'mt-32'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        <CardTitlePageMobile link={history.goBack} title="Detail lemburan" />

        <CardGridDekstop col={1} moreClass="mt-4 gap-2 lg:grid-cols-2">
          <Card addClass="rounded-lg bg-white p-4 lg:col-span-2">
            <HeadingMobile heading="Location Map" />
            <div className="rounded-md mt-4">
              <CardMapsInOut
                mark={markOne}
                className="w-full min-h-full h-96"
              />
            </div>
          </Card>
          <Card addClass="lg:-my-4 flex flex-col justify-between bg-white rounded-md">
            <div className="flex flex-col gap-3 p-4">
              <h1 className="font-semibold text-gray-800 mb-4">
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
          </Card>
          <Card addClass="-my-2 lg:-my-4 flex flex-col justify-between bg-white rounded-md">
            <div className="grid grid-cols-1 gap-4 p-4">
              <h1 className="font-semibold text-gray-800 mb-2">
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
          </Card>
          <Card addClass=" lg:col-span-2 flex flex-col rounded-md bg-white p-4">
            <Textarea
              name="keterangan"
              value={state.keterangan}
              onChange={setState}
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
          </Card>
        </CardGridDekstop>
      </div>
    </div>
  );
};

export default DetailApproval;
