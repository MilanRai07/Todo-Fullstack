//this is used for all the mail with verification code
export const sendVerificationEmail = async (email, verificationToken) => {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({
            sender: { name: "Todo App", email: process.env.SENDER_EMAIL },
            to: [{ email }],
            subject: "Your verification code",
            htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 400px;">
          <p>Your verification code is:</p>
          <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">
            ${verificationToken}
          </p>
          <p>This code expires in 15 minutes. If you didn't request it, ignore this email.</p>
        </div>`,
            textContent: `Your verification code is ${verificationToken}. It expires in 10 minutes.`,
        }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Brevo error ${res.status}: ${errorText}`);
    }

    return true;
}