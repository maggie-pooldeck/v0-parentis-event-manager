// File: app/api/waitlist/route.js

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, name, numKids } = body

    // Validate email
    if (!email || !email.includes("@")) {
      return Response.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Add contact to Brevo
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name || "",
          NUM_KIDS: numKids || "",
        },
        listIds: [6],
        updateEnabled: true,
      }),
    })

    if (brevoResponse.ok || brevoResponse.status === 204) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: "Maggie",
            email: "hello@parentis.app",
          },
          to: [{ email: email, name: name || "" }],
          subject: "You're on the Parentis waitlist!",
          htmlContent: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #262626; line-height: 1.6; background-color: #ffffff;">
                
                <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 26px; color: #6477D5; margin: 0 0 32px 0; font-weight: 700; line-height: 1.3;">
                  This is not another app, this is a lifeline.
                </h1>
                
                <p style="font-size: 16px; margin: 0 0 20px 0; color: #262626;">
                  Hi${name ? " " + name : ""},
                </p>
                
                <p style="font-size: 16px; margin: 0 0 20px 0; color: #262626;">
                  Thanks for joining! We're building Parentis because we've experienced firsthand the insane number of apps and emails modern parents juggle.
                </p>
                
                <p style="font-size: 16px; margin: 0 0 20px 0; color: #262626;">
                  Parentis uses AI to extract all your kids' school and sports chaos, sync it automatically to your existing calendar, and provide weekly Sunday reports for the next few weeks so you can easily manage everything in one place.
                </p>
                
                <p style="font-size: 16px; margin: 0 0 20px 0; color: #262626; font-weight: 600;">
                  We'll email you when we launch.
                </p>
                
                <p style="font-size: 16px; margin: 32px 0 8px 0; color: #262626;">
                  All the best,
                </p>
                
                <p style="font-size: 16px; margin: 0 0 40px 0; color: #262626;">
                  Team Parentis
                </p>
                
                <div style="margin-top: 40px; padding-top: 20px;">
                  <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 24px; color: #000000; margin: 0; font-weight: 400;">
                    Parentis
                  </p>
                </div>
                
              </body>
            </html>
          `,
        }),
      })

      return Response.json({ success: true, message: "Successfully joined waitlist!" }, { status: 200 })
    } else {
      const errorData = await brevoResponse.json()
      console.error("Brevo error:", errorData)
      return Response.json({ error: "Failed to add to waitlist. Please try again." }, { status: 500 })
    }
  } catch (error) {
    console.error("Waitlist API error:", error)
    return Response.json({ error: "Server error. Please try again later." }, { status: 500 })
  }
}
