const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    try {
        const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
        const { to, subject, html } = options;

        const { data, error } = await resend.emails.send({
            from: "Website <website@resend.dev>",
            to: [to],
            subject,
            html
        });

        if (error) {
            console.error('Email sending error:', error);
            throw new Error(`Failed to send email: ${error.message}`);
        }

        console.log(`Email ${data.id} sent to ${to}`);
    } catch (error) {
        console.error('Email sending error:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = sendEmail;
 