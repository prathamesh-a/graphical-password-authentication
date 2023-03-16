import {Page} from "../util/config";
import {motion} from "framer-motion";

export default function Slider(props) {

    const additionalClasses = "text-[#A259FF]"

    function closeSlider() {
        props.setSlider(false)
    }

    function setPage(page) {
        props.setPage(page)
        closeSlider()
    }

    function logout() {
        props.setUserInfo({username: "", email: ""})
        props.setLoggedIn(false)
        setPage(Page.HOME_PAGE)
    }

    return (
        <div className="md:hidden flex justify-center fixed w-full h-full overflow-hidden z-50">
            <motion.div initial={{opacity: 0}} animate={{opacity: 0.8}} transition={{delay: 0.3}} onClick={closeSlider} className="right-0 w-1/3 bg-black opacity-80"></motion.div>
            <motion.div initial={{x:200}} animate={{ x: 0 }} transition={{ duration: 0.4, type: "tween" }} className="bg-[#3b3b3b] h-full w-2/3">

                <div className="flex justify-end pr-3 pt-2">
                    <img onClick={closeSlider} alt="" width="32px" src="https://img.icons8.com/fluency-systems-filled/48/A259FF/multiply.png"/>
                </div>

                {!props.loggedIn && <div className="flex justify-around mt-12 flex-col items-center text-white">
                    <button onClick={() => setPage(Page.LOGIN_PAGE)} className="mb-6 transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 border-[#A259FF] border-2 hover:bg-transparent">Login</button>
                    <button onClick={() => setPage(Page.SIGNUP_PAGE)} className="transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 border-[#A259FF] border-2 hover:bg-transparent">Sign Up</button>
                </div>}

                {props.loggedIn && <div className="flex items-center flex-col text-white mt-12">
                    <p className={`text-2xl font-mono text-[#A259FF]`}>{props.userInfo.username}</p>
                    <button onClick={() => logout()} className="mt-4 w-1/3 transition duration-500 ease-in-out bg-[#A259FF] rounded-lg px-4 py-1 border-[#A259FF] border-2 hover:bg-transparent">Logout</button>
                </div>}

                <div className="text-xl mt-12 flex flex-col font-['Work_Sans'] text-white items-center">
                    <p onClick={() => setPage(Page.HOME_PAGE)} className={`mb-6 ${props.currentPage === Page.HOME_PAGE ? additionalClasses : ""}`}>Home</p>
                    <p onClick={() => setPage(Page.CONTACT)} className={`${props.currentPage === Page.CONTACT ? additionalClasses : ""}`}>Contact</p>
                </div>
            </motion.div>
        </div>
    )
}