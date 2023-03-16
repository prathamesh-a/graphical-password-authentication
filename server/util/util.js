//import * as dotenv from 'dotenv'
import fetch from "node-fetch";
import { createApi } from "unsplash-js";
import { userAttemptsModel } from "../models/user_attempts.js";
import { transporter } from "./nodemailer.js";

//dotenv.config()

function checkArray(arr1, arr2, sequence) {
    if (arr1.length != arr2.length) return false;
    var gflag = false;
    if (sequence){
        for(let i=0; i<arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                gflag = false;
                break;
            }
            else gflag = true;
        }
    } 
    else {    
        for(let i=0; i<arr1.length; i++) {
        var flag = false;
        for(let j=0; j<arr2.length; j++) {
            if (arr1[i] === arr2[j]) {flag = true;}
        }
        gflag = flag;
        }
    }
    return gflag;
}

const unsplash = createApi({
    accessKey: '4ZbDrA6rYXxDrle-QX4iwf9TNmbqrwlL3GY272X_T5I',
    fetch: fetch,
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

async function sendEmail(email) {
    const currentUser = await userAttemptsModel.findOne({email: email})
    const mailOptions = {
        from: "graphicalpassauth@gmail.com",
        to: email,
        subject: "GPA | Account Blocked",
        html: `<div>
                <p>Your account has been blocked for multiple attempts of login with invalid credentials.</p>
                <p>Click the link below to unblock:</p>
                <a href='${process.env.URL}/api/verify?email=${email}&token=${currentUser.token}'>Unblock</a>
               </div>`
    }
    console.log("Sending email to " + email)
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err)
        else console.log("Email sent to " + email)
    })
}

export {checkArray, unsplash, shuffleArray, sendEmail}