import {useEffect, useState} from "react";
import PasswordIcon from "./Items/PasswordIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons'
import validator from "validator/es";
import axios from "axios";
import {successToast, Toast} from "../util/toast";
import {checkEmail, checkUsername} from "../util/validation";
import {Page} from "../util/config";
import {api} from "../static/config";
import {getNameByNumber} from "../util/util";
import {nanoid} from "nanoid";

export default function Signup(props) {

    const [next, setNext] = useState(false)
    const [iteration, setIteration] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [imageData, setImageData] = useState([])
    const [signupInfo, setSignupInfo] = useState({
        username: "",
        email: "",
        password: "",
        pattern: ["", "", "", ""],
        sets: [[]]
    })

    function handleChange(event) {
        setSignupInfo(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    useEffect(function() {
        setSignupInfo(prev => {
            return {
                ...prev,
                "sets": imageData,
                "pattern": ["", "", "", ""]
            }
        })
    }, [imageData])

    function getIcons() {
        return imageData[iteration].map(prev => <PasswordIcon iteration={iteration} id={prev.id} key={nanoid()} src={prev.url} selected={prev.id === signupInfo.pattern[iteration]} onClick={handleImageClick}/>)
    }

    function handleImageClick(id, iteration) {
        var newPattern = signupInfo.pattern
        newPattern[iteration] = id
        setSignupInfo(prev => {
            return {
                ...prev,
                "pattern": newPattern
            }
        })
    }

    function createAccount() {
        if (signupInfo.pattern[iteration] === "") {
            Toast("Select an image first!")
            return
        }

        if (iteration < 3) {
            setIteration(iteration+1)
            return
        }

        if (signupInfo.pattern.length < 4) {
            Toast("Chose all 4 images!")
            return
        }
        props.setLoading(true)
        axios.post(`${api.url}/api/user/signup`, signupInfo)
            .then(res => {
                    props.setLoading(false)
                    console.log(res.data)
                    props.setUserInfo({email: res.data.email, username: res.data.username})
                    props.setLoggedIn(true)
                    successToast("Logged In!")
                    props.setPage(Page.HOME_PAGE)
                }
            )
            .catch(err => {
                console.log(err)
                props.setLoading(false)
                Toast(err.response.data.message)
            })
    }

    function validateData() {
        if (signupInfo.username.length < 1) {
            Toast("Invalid username!")
            return false
        }
        else if (!validator.isEmail(signupInfo.email)) {
            Toast("Invalid email address!")
            return false
        }
        else if (signupInfo.password.length < 8) {
            Toast("Password length should be more than 8")
            return false
        }
        return true
    }

    async function validateUsernameAndEmail() {
        const isEmailExist = await checkEmail(signupInfo.email, props.setLoading)
        const isUsernameExists = await checkUsername(signupInfo.username, props.setLoading)

        if (isUsernameExists) Toast("Username already exists!")
        else if (isEmailExist) Toast("Email already exists!")

        return !isEmailExist && !isUsernameExists
    }

    async function handleNextClick(event) {
        if (validateData() && await validateUsernameAndEmail()) {setNext(true)}
    }

    function searchKeyword() {
        if (keyword === "") {
            Toast("Invalid keyword!")
            return
        }

        props.setLoading(true)
        axios.get(`${api.url}/api/image/search?keyword=${keyword}`)
            .then(data => {
                props.setLoading(false)
                setImageData(data.data)
            })
            .catch(err => {
                console.log(err)
                props.setLoading(false)
                Toast(err.response.data.message)
            })
    }

    function getButtonTitle() {
        if (iteration < 3) return "Next"
        else return "Create Account"
    }

    function handleBackClick() {
        if (iteration === 0) setNext(false)
        else setIteration(iteration-1)
    }

    return (
        <div className=" sm:h-[38rem] mt-12">
            {!next && <div className="flex justify-center h-full">
                {/*IMAGE*/}
                <div className="hidden sm:block">
                    <img className="transition duration-500 ease-in-out hover:scale-95 h-full" alt="" src="../static/img/signup.png"/>
                </div>
                {/*SIGNUP FORM*/}
                <div className="font-['Work_Sans'] mt-4">
                    <p className="px-4 sm:px-0 text-white text-3xl sm:text-5xl sm:font-bold">Create Account</p><br/>
                    <p className="text-white text-lg sm:text-2xl px-4 sm:px-0">Welcome! Enter Your Details And Experience</p>
                    <p className="text-white text-lg sm:text-2xl px-4 sm:px-0">Graphical Password System.</p><br/>
                    <div className="flex flex-col w-[80%] sm:w-2/3 px-4 sm:px-0">
                        <input value={signupInfo.username} onChange={handleChange} name="username" className="rounded-full h-8 sm:h-12 px-6 font-3xl" type="text" placeholder="Username"/>
                        <input value={signupInfo.email} onChange={handleChange} name="email" className="rounded-full h-8 sm:h-12 px-6 font-3xl mt-4" type="email" placeholder="Email"/>
                        <input value={signupInfo.password} onChange={handleChange} name="password" className="rounded-full h-8 sm:h-12 px-6 font-3xl mt-4" type="password" placeholder="Password"/>
                    </div>
                    <button onClick={handleNextClick} className="ml-4 sm:ml-0 transition duration-500 ease-in-out h-8 sm:h-12 bg-[#A259FF] rounded-full px-6 sm:w-2/3 mt-6 text-white border-2 hover:bg-transparent border-[#A259FF] font-bold">Next</button>
                </div>
            </div>}

            {next && <div className="sm:flex h-full">
                {imageData.length > 0 && <div
                    className="hidden sm:grid grid-cols-4 bg-[#3B3B3B] h-full rounded-lg w-[75%] justify-items-center py-4 px-2 gap-2 ml-12">
                    {getIcons()}
                </div>}
                {imageData.length === 0 && <div
                    className="text-2xl text-white hidden sm:flex justify-center items-center h-full bg-[#3B3B3B] w-[75%] ml-12 rounded-lg">
                    <p className="bg-red-600 px-3 py-1 rounded-lg">No Images :(</p>
                </div>}

                {/*DESKTOP VIEW*/}
                <div className="hidden sm:block font-['Work_Sans'] mt-4 ml-12">
                    <p className="text-white text-5xl font-bold">Set Graphical Password</p><br/>
                    <p className="text-white text-2xl">Enter keyword to get images.</p>
                    <p className="text-white text-2xl">Select <span className="text-green-400">{getNameByNumber(iteration+1)}</span> Image.</p>
                    <br/>
                    {iteration === 0 && <div className="align-middle items-center">
                        <p className="text-white text-2xl">Type Keyword: </p>
                        <div className=" rounded-lg flex mt-2">
                            <input onChange={(event) => setKeyword(event.target.value)} value={keyword}
                                   placeholder="Try 'Cats'" className="rounded-l-md px-4 bg-gray-100 text-2xl py-1"/>
                            <button onClick={searchKeyword}
                                    className="bg-gray-100 transition duration-500 ease-in-out rounded-r-lg px-4 h-12 hover:bg-gray-300">
                                <FontAwesomeIcon className="text-black" icon={faSearch}/></button>
                        </div>
                    </div>}
                    <button onClick={createAccount} className="transition duration-500 ease-in-out h-12 bg-[#A259FF] rounded-full px-6 w-2/3 mt-12 text-white border-2 hover:bg-transparent border-[#A259FF] font-bold">{getButtonTitle()}</button>
                    <button onClick={handleBackClick} className="transition duration-500 ease-in-out border-2 border-[#A259FF] rounded-full px-4 h-12 ml-4 hover:bg-[#A259FF]">
                        <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
                    </button>
                </div>

                {/*MOBILE VIEW*/}
                <div className="sm:hidden font-['Work_Sans'] mt-4 ml-4">
                    <p className="text-white text-2xl">Set Graphical Password</p><br/>
                    <p className="text-white text-lg">Enter keyword to get images.</p>
                    <p className="text-white text-lg">Select <span className="text-green-400">{getNameByNumber(iteration+1)}</span> Image.</p>
                    <br/>
                    {iteration === 0 && <div className="align-middle items-center">
                        <p className="text-white text-lg">Type Keyword: </p>
                        <div className=" rounded-md flex mt-2">
                            <input onChange={(event) => setKeyword(event.target.value)} value={keyword}
                                   placeholder="Try 'Cats'" className="rounded-l-md px-2 bg-gray-100 h-8 text-lg py-0"/>
                            <button onClick={searchKeyword}
                                    className="bg-gray-100 transition duration-500 ease-in-out rounded-r-lg px-4 h-8 hover:bg-gray-300">
                                <FontAwesomeIcon className="text-black" icon={faSearch}/></button>
                        </div>
                    </div>}

                    {imageData.length > 0 && <div
                        className="mt-4 grid grid-cols-2 bg-[#3B3B3B] h-full rounded-md w-full justify-items-center py-4 gap-1 gap-x-0 -ml-2">
                        {getIcons()}
                    </div>}
                    {imageData.length === 0 && <div
                        className="text-xl text-white flex justify-center items-center h-full bg-[#3B3B3B] w-[80%] rounded-md mt-4">
                        <p className="bg-red-600 px-2 py-0 rounded-md my-8">No Images :(</p>
                    </div>}

                    <button onClick={createAccount} className="transition duration-500 ease-in-out h-8 bg-[#A259FF] rounded-full px-6 w-2/3 mt-12 text-white border-2 hover:bg-transparent border-[#A259FF]">{getButtonTitle()}</button>
                    <button onClick={handleBackClick} className="transition duration-500 ease-in-out border-2 border-[#A259FF] rounded-full px-4 h-8 ml-4 hover:bg-[#A259FF]">
                        <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
                    </button>
                </div>
            </div>}
        </div>
    )
}


// useEffect(function() {
//     const newPattern = signupInfo.pattern;
//     for(let i=0; i<iconsData.length; i++) {
//         const icon = iconsData[i];
//         if (icon.selected && (!newPattern.includes(icon.id))) {
//             newPattern.push(icon.id)
//         }
//         else if (newPattern.includes(icon.id) && !icon.selected){
//             removeElementFromArray(icon.id, newPattern)
//         }
//     }
//     setSignupInfo(prev => {
//         return {
//             ...prev,
//             "pattern": newPattern
//         }
//     })
// }, [iconsData])