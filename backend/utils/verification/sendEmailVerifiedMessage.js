export const sendEmailVerifiedMessage = async (email) => {
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
            subject: "Email Verified Successful",
            htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 400px;">
          <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">
            Your email is verified successfully.
          </p>
          <p>Keep progressing by making targets and complete you missions. Best Wishes</p>
        </div>`,
        }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Brevo error ${res.status}: ${errorText}`);
    }

    return true;
}