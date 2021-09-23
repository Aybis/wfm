import Menu from 'components/devices/desktop/section/Menu';
import MobileMenu from 'components/devices/mobile/sections/MobileMenu';
import React from 'react'
import { isDesktop } from 'react-device-detect';
import { useParams } from 'react-router-dom';

export default function Profile({ history }) {
    const { id } = useParams();

    console.log(id);

    return (
        <div className="relative w-full h-screen bg-coolGray-100">
            <div
                className={`container mx-auto fixed inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${isDesktop && 'mt-24'
                    }`}>
                {/* Menu For Dekstop Only */}
                <Menu />
                <MobileMenu />

                <div className="relative lg:mt-12">
                    <h1 className="text-gray-700 lg:text-4xl text-2xl font-semibold">
                        Profile
                    </h1>
                </div>

            </div>
        </div>
    )
}
