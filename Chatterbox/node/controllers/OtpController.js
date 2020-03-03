const model = require('../models')
const Otps = model.Otp
const nodemailer = require("nodemailer");
const Otp = () => {

}
// Otp.setOtp = async (otp, id) => {
  
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: '123satheesh99@gmail.com',
//             pass: '7904387249'
//         }
//     });
//     var mailOptions = {
//         from: '123satheesh99@gmail.com',
//         to: 'satheeshkumar.venkatesan@codingmart.com',
//         subject: 'Authentication Purpose!!',
//         text: `This is the one time password ${otp} Don't share anyone!!!`
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
//     let response = await Otps.create({
//         otp: otp,
//         flag: 'true',
//         UserId: id
//     })
//     return response;
// }

Otp.check = async (userid) => {
    let response = await Otps.findOne({
        attributes: ['id'],
        where: {
            UserId: userid
        }
    })
    return response;
}
Otp.getOtp = async (otp, UserId) => {
    let response = await Otps.findOne({
        where: {
            UserId,
            otp,
            flag: 'true'
        }
    })
    if (response != null) {
        response = await Otps.destroy({
            where: {
                UserId,
                otp
            }
        })
        console.log(response)
        return { valid: true };
    }
    else
        return { valid: false };

}
module.exports = Otp;