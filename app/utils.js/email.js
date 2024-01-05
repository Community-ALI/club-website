const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const ses = new AWS.SES();


const sendEmail = async (toAdress, subject, body) => {
    const params = {
      Destination: {
        ToAddresses: [toAdress],
      },
      Message: {
        Body: {
          Text: {
            Data: body,
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: "communityalis@gmail.com",
    };
  
    try {
      const data = await ses.sendEmail(params).promise();
      console.log("Email sent successfully:", data.MessageId);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };
  

export default sendEmail;