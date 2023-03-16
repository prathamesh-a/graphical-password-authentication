import {Triangle} from "react-loader-spinner";

export default function Loader() {
    return (
        <div
            className="text-white fixed bg-[#000000e5] h-[100%] w-[100%] flex overflow-hidden z-50 justify-center items-center">
            <div className="">
                <div className="flex justify-center">
                    <Triangle
                        height="80"
                        width="80"
                        color="#A259FF"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </div>
                <p className="text-xl mt-4 text-center">Loading please wait...</p>
            </div>

        </div>
    )
}