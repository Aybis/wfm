import { XIcon } from '@heroicons/react/solid';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Modal({ children, title, isShowModal, show }) {
  return (
    <CSSTransition
      in={show}
      timeout={400}
      classNames="alert"
      unmountOnExit
      onExited={isShowModal}>
      <>
        <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 mx-4 z-50 outline-none focus:outline-none">
          <div className="relative min-w-full lg:min-w-min w-auto my-6 mx-auto xl:max-w-6xl lg:max-w-2xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-5 border-b border-solid border-coolGray-200 rounded-t">
                <h3 className="text-lg lg:text-3xl font-semibold capitalize">
                  {title}
                </h3>
                <button
                  className="p-1 ml-auto group bg-transparent border-0 text-gray-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={isShowModal}>
                  <XIcon className="h-6 w-6 lg:w-10 lg:h-10 hover:bg-gray-100 hover:text-gray-600 rounded transition-all duration-300" />
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">{children}</div>
              {/*footer*/}
              <div className="flex items-center justify-end p-2 lg:p-6 border-t border-solid border-coolGray-200 rounded-b">
                <button
                  className="text-apps-red hover:text-red-600 transition-all duration-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear"
                  type="button"
                  onClick={isShowModal}>
                  Close
                </button>
                {/* <button
              className="bg-apps-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}>
              Save Changes
            </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </CSSTransition>
  );
}
