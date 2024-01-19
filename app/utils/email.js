const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const ses = new AWS.SES();

const sendEmail = async (toAddress, subject, body, fileBase64) => {
  let dataString =
    `From: communityalis@gmail.com\n` +
    `To: ${toAddress}\n` +
    `Subject: ${subject}\n` +
    `MIME-Version: 1.0\n` +
    `Content-Type: multipart/mixed; boundary="NextPart"\n\n` +
    `--NextPart\n` +
    `Content-Type: text/plain\n\n` +
    `${body}\n\n`;
    if (fileBase64) {
      dataString +=
        `--NextPart\n` +
        `Content-Type: application/pdf; name="application.pdf"\n` +
        `Content-Description: attachment\n` +
        `Content-Disposition: attachment; filename="application.pdf"\n` + 
        `Content-Transfer-Encoding: base64\n\n` +
        `${fileBase64}\n\n`;
    }

  dataString += `--NextPart--`;

  const params = {
    RawMessage: {
      Data: Buffer.from(dataString, "utf-8"),
    },
    Destinations: [toAddress],
    Source: "communityalis@gmail.com",
  };

  try {
    console.log(
      "Sending email with subject:",
      subject,
      "to:",
      toAddress,
      "with body:",
      body,
      "and attachment:",
      fileBase64
    );
    const data = await ses.sendRawEmail(params).promise();
    console.log("Email sent successfully:", data.MessageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export default sendEmail;
