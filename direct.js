const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', (req, res) => {
    const htmlOutput = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Assistant&display=swap');
            body {
                width: fit-content; 
                padding: 10px 0px;
            }
        </style>
        <body 
            style="
                width: fit-content; 
                padding: 10px 0px;
            "
        >
            <table 
                style="
                    width: 440px; 
                    background: linear-gradient(to right, #efa3bf, #ff92a5 70%);
                "
            >
                <tbody>
                    <tr>
                        <th>
                            <img 
                                src="https://creative-iii.s3.eu-west-2.amazonaws.com/email-header.png" 
                                style="
                                    margin: 10px; 
                                    width: 440px; 
                                    border: 1px solid white;
                                "
                            >
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <img 
                                src="https://creative-iii.s3.eu-west-2.amazonaws.com/email-details.png" 
                                style="
                                    display: block;
                                    margin: 30px auto 0;
                                    width: 440px;
                                    height: 30px;
                                    object-fit: cover;
                                "
                            >
                        </td>
                    </tr>
                    <tr>
                        <td 
                            style="white-space: pre-line; 
                                font-family: 'Assistant', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                font-size: 18px;" 
                            align="center"
                        >
                            Name: ${req.body.name}
                        </td>
                    </tr>
                    <tr>
                        <td 
                            style="white-space: pre-line; 
                                font-family: 'Assistant', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                font-size: 18px;" 
                            align="center"
                        >
                            Email: ${req.body.email}
                        </td>
                    </tr>
                    <tr>
                        <td 
                            style="white-space: pre-line; 
                                font-family: 'Assistant', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                font-size: 18px;" 
                            align="center"
                        >
                            Phone: ${req.body.phone}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img 
                                src="https://creative-iii.s3.eu-west-2.amazonaws.com/email-message.png" 
                                style="
                                    display: block;
                                    margin: 30px auto 0;
                                    width: 440px;
                                    object-fit: cover;
                                    height: 30px;
                                "
                            >
                        </td>
                    </tr>
                    <tr>
                        <td 
                            style="white-space: pre-line; 
                                font-family: 'Assistant', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                font-size: 18px; 
                                padding: 0 20px;" 
                            align="center"
                        >
                            ${req.body.message}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img 
                                src="https://creative-iii.s3.eu-west-2.amazonaws.com/email-footer.png" 
                                style="
                                    display: block;
                                    margin: 50px auto 0;
                                    width: 440px;
                                "
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
    `;

    const plaintextOutput = `
        You have a new enquiry!
        Contact Details
        - Name:  ${req.body.name}
        - Email:  ${req.body.email}
        - Phone:  ${req.body.phone}
        
        Message:
        ${req.body.message}
    `;

    async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_ADDRESS, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"${req.body.name}" <${req.body.email}>`, // sender address
            to: 'creative.iii.design@gmail.com', // list of receivers
            subject: `Enquiry from ${req.body.name}`, // Subject line
            text: plaintextOutput, // plain text body
            html: htmlOutput, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.json({ success: true, msg: 'Message Sent' });
    }

    main().catch(err => {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: 'Message Failed',
            err,
        });
    });
});

module.exports = router;
