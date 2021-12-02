import CardGridDekstop from 'components/devices/desktop/molecules/CardGridDekstop';
import Menu from 'components/devices/desktop/section/Menu';
import HeadingMobile from 'components/devices/mobile/component/atoms/HeadingMobile';
import Card from 'components/devices/mobile/component/molecules/Card';
import CardTitlePageMobile from 'components/devices/mobile/component/molecules/CardTitlePageMobile';
import Loading from 'components/devices/universal/atoms/Loading';
import Textarea from 'components/devices/universal/atoms/Textarea';
import CardApprover from 'components/devices/universal/molecules/CardApprover';
import CardMapsInOut from 'components/devices/universal/molecules/CardMapsInOut';
import CardTime from 'components/devices/universal/molecules/CardTime';
import LabelValueHorizontal from 'components/devices/universal/molecules/LabelValueHorizontal';
import absensi from 'constants/api/absensi';
import convertDate from 'helpers/hooks/convertDate';
import useForm from 'helpers/hooks/useForm';
import { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const DetailApproval = ({ history }) => {
  const USER = useSelector((state) => state.users);
  const [lemburanDetail, setlemburanDetail] = useState({});
  const [state, setState] = useForm({
    keterangan: '',
    status: '',
    username: USER?.username,
  });
  const [markMap, setMarkMap] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const { id } = useParams();

  const getDataLemburanDetail = async () => {
    let result = [];

    return absensi
      .overtimeDetail({
        params: {
          id: id,
        },
      })
      .then((res) => {
        setlemburanDetail(res.data);
        res.data.detail_overtime.map((item) =>
          result.push({
            address: item.lokasi,
            longLat: {
              lat: Number(item.long_lat.split(',')[0]),
              lng: Number(item.long_lat.split(',')[1]),
            },
          }),
        );
        return result;
      })
      .catch((err) => {
        return err.response;
      });
  };

  const handlerSubmitApproval = (event) => {
    event.preventDefault();
    setisSubmit(true);
    swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        absensi
          .overtimeApprove(state, id)
          .then((response) => {
            swal({
              title: 'Poof! Approve Berhasil!',
              icon: 'success',
              button: 'Close!',
            }).then((val) => {
              setisSubmit(false);
              setTimeout(() => {
                history.push('/approval');
              }, 300);
            });
          })
          .catch((err) => {
            setisSubmit(false);
            swal({
              title:
                err.response.data.message.map((item) => item) ??
                'Something happened!',
              icon: 'error',
            });
          });
      } else {
        setisSubmit(false);
        swal('Okay!');
      }
    });
  };

  useEffect(() => {
    getDataLemburanDetail().then(function (response) {
      setMarkMap(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full min-h-screen h-full bg-warmGray-50">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 pb:20 lg:pb-10 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-14 md:pb-4 hidden-scroll ${
          isDesktop && 'mt-32'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        <CardTitlePageMobile
          link={history.goBack}
          title="Detail lemburan"
          expand
        />

        <CardGridDekstop col={1} moreClass="mt-4 gap-2 lg:grid-cols-2">
          <Card addClass="rounded-lg bg-white p-4 lg:col-span-2 shadow-lg">
            <HeadingMobile heading="Location Map" />
            <div className="rounded-md mt-4">
              {markMap.length > 0 && (
                <CardMapsInOut
                  mark={markMap}
                  className="w-full min-h-full h-96"
                />
              )}
            </div>
          </Card>
          <Card addClass="-mt-2 lg:-my-4 flex flex-col justify-between bg-white rounded-md shadow-lg">
            <div className="flex flex-col gap-3 p-4">
              <h1 className="font-semibold text-gray-800 mb-4">
                Overtime Summary
              </h1>
              <LabelValueHorizontal
                classValue="capitalize"
                label="Nama"
                value={lemburanDetail?.user?.name?.toLowerCase() ?? ''}
              />
              <LabelValueHorizontal
                label="Tanggal"
                value={convertDate(
                  'date',
                  lemburanDetail?.detail_overtime?.[0].jam,
                )}
              />
              <LabelValueHorizontal
                label="Posisi"
                value={lemburanDetail?.user?.nik ?? ''}
              />
              <LabelValueHorizontal
                label="Subject"
                value={lemburanDetail.subject ?? ''}
              />
              <LabelValueHorizontal
                label="Deskripsi"
                value={
                  lemburanDetail?.detail_overtime?.[1]
                    ? lemburanDetail.detail ?? 'By Sistem'
                    : 'On Duty'
                }
              />
            </div>
            <div className="flex justify-between gap-3 mt-2 p-4 lg:px-12 bg-warmGray-50 rounded-b-md border-t border-warmGray-100">
              <CardTime
                time={convertDate(
                  'timeAm',
                  lemburanDetail?.detail_overtime?.[0].jam,
                )}
                title="in"
              />
              {lemburanDetail?.detail_overtime?.[1] ? (
                <>
                  <CardTime
                    time={convertDate(
                      'timeAm',
                      lemburanDetail?.detail_overtime?.[1].jam,
                    )}
                    title="out"
                  />
                  <CardTime
                    time={
                      (
                        convertDate(
                          'hoursMinutes',
                          lemburanDetail?.detail_overtime?.[1].jam,
                        ) -
                        convertDate(
                          'hoursMinutes',
                          lemburanDetail?.detail_overtime?.[0].jam,
                        )
                      ).toFixed(2) + ' Hr'
                    }
                    title="ovt"
                  />
                </>
              ) : (
                <>
                  <CardTime time={'On Duty'} title="out" />
                  <CardTime time={' On Duty'} title="ovt" />
                </>
              )}
            </div>
          </Card>
          <Card addClass="-my-2 lg:-my-4 flex flex-col justify-between bg-white rounded-md shadow-lg">
            <div className="grid grid-cols-1 gap-4 p-4">
              <h1 className="font-semibold text-gray-800 mb-2">
                Overtime Approval
              </h1>

              {lemburanDetail?.detail_overtime?.[1] && (
                <CardApprover
                  date={convertDate(
                    'date',
                    lemburanDetail?.detail_overtime?.[1].jam,
                  )}
                  image={''}
                  name={lemburanDetail?.user?.name?.toLowerCase()}
                  status={'inisiasi'}
                  time={convertDate(
                    'timeAm',
                    lemburanDetail?.detail_overtime?.[1].jam,
                  )}
                />
              )}

              {lemburanDetail?.log_approval?.length > 0 &&
                lemburanDetail.log_approval.map((item, index) => (
                  <CardApprover
                    key={index}
                    date={item.created_at}
                    image={item.image}
                    name={item.user.name.toLowerCase()}
                    status={item.status}
                    time={convertDate('timeAm', item.created_at)}
                  />
                ))}
            </div>
          </Card>
          {USER.id !== lemburanDetail.user_id &&
          lemburanDetail.status === 'progress' ? (
            <form
              onSubmit={handlerSubmitApproval}
              className="mt-4 lg:col-span-2 flex flex-col rounded-md bg-white p-4 shadow-lg">
              <Textarea
                name="keterangan"
                value={state.keterangan}
                onChange={setState}
                inputClassName="W-full"
                labelName="Comment"
                placeholder="Oke..."
              />

              {state.keterangan.length > 1 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {state.status === 'reject'}
                  <button
                    type="submit"
                    value="reject"
                    name="status"
                    disabled={isSubmit}
                    className="flex justify-center items-center bg-apps-red py-2 hover:bg-red-700 transition-all duration-300 ease-in-out rounded text-white font-medium disabled:opacity-40"
                    onClick={() => (state.status = 'reject')}
                    placeholder="Reject">
                    {state.status === 'reject' && isSubmit ? (
                      <Loading color="text-white" height={5} width={5} />
                    ) : (
                      ''
                    )}
                    Reject
                  </button>
                  <button
                    type="submit"
                    value="approve"
                    name="status"
                    disabled={isSubmit}
                    onClick={() => (state.status = 'approve')}
                    className="flex justify-center items-center bg-apps-primary py-2 hover:bg-blue-700 transition-all duration-300 ease-in-out rounded text-white font-medium disabled:opacity-40">
                    {state.status === 'approve' && isSubmit ? (
                      <Loading color="text-white" height={5} width={5} />
                    ) : (
                      ''
                    )}
                    Approve
                  </button>
                </div>
              )}
            </form>
          ) : (
            ''
          )}
        </CardGridDekstop>
      </div>
    </div>
  );
};

export default DetailApproval;
