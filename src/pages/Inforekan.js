import { SearchIcon } from "@heroicons/react/outline";
import {
  ArrowUpIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Loading from "components/atoms/Loading";
import CardTitlePage from "components/molecules/CardTitlePage";
// import { setAuthorizationHeader } from "configs/axios";
// import users from "constants/api/users";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

const PAGE_NUMBER = 1;

const Inforekan = ({ history }) => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [isLoad, setIsLoading] = useState(false);
  const [top, settop] = useState(false);

  //   const getDataKaryawan = () => {
  //     let token = JSON.parse(localStorage.getItem("WFM:token"));
  //     setAuthorizationHeader(`Bearer ${token.token}`);

  //     users.allTroops().then((res) => {});
  //   };

  //   useEffect(() => {
  //     getDataKaryawan();
  //     // return () => {
  //     //     cleanup
  //     // }
  //   }, []);

  const fetchData = () => {
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
      .then((res) => res.json())
      .then((json) => setState([...state, ...json.data]));
  };

  const scrollToEnd = () => {
    setPage(page + 1);
  };

  window.onscroll = function () {
    if (window.pageYOffset > 350) {
      settop(true);
    } else if (window.pageXOffset < 350) {
      settop(false);
    }
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        scrollToEnd();
      }, 1000);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="relative bg-coolGray-50 min-h-screen h-full p-6 pb-12">
      <CardTitlePage goBack={history.goBack} title="Inforekan" />

      {top && (
        <CSSTransition
          in={top}
          timeout={500}
          classNames="alert"
          unmountOnExit
          onEnter={() => settop(true)}>
          <button
            className="fixed bottom-8 right-6 p-1 rounded-full bg-apps-primary  items-center justify-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUpIcon className="h-10 w-10 text-white" />
          </button>
        </CSSTransition>
      )}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          className=" p-2 focus:outline-none bg-white  text-apps-text w-2/3 rounded-md"
          placeholder="Ahmad Fauzi"
        />
        <button className="p-2 bg-apps-primary text-white font-semibold  tracking-wide w-1/3 flex rounded-md">
          <SearchIcon className="h-6 w-6" />
          Search
        </button>
      </div>

      <div className="fle flex-col gap-4 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12 transition-all duration-300 ease-in-out">
          {state.length > 0 &&
            state.map((el, index) => (
              <div
                key={index}
                className="flex flex-none flex-col justify-between rounded-lg p-4 bg-white shadow-sm">
                <div className="flex flex-col items-center">
                  <UserCircleIcon className="h-24 w-24 p-2 text-apps-text" />
                  <div className="-mt-4 hidden">
                    <PaperAirplaneIcon
                      onClick={() => alert("test")}
                      className=" p-1 text-white h-6 w-6 rounded-full bg-apps-red transform rotate-45 text-center cursor-pointer hover:bg-red-600"
                    />
                  </div>

                  <h3 className="text-xs font-medium text-gray-800 transform capitalize mt-2">
                    {el.name}
                  </h3>
                  <h4 className="text-xs font-light text-apps-text text-opacity-40">
                    {el.airline.name}
                  </h4>
                  <h4 className="text-xs font-light text-apps-text text-opacity-40">
                    {el.airline.id}
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isLoad && (
        <div className="flex items-center justify-center my-4">
          <Loading height={8} width={8} />
          <p className="text-apss-text text-opacity-50">Loading ....</p>
        </div>
      )}
    </div>
  );
};

export default Inforekan;
