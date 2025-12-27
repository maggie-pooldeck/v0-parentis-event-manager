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
            name: "Parentis",
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
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; line-height: 1.6; background-color: #ffffff;">
                
                <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #6477D5; margin-bottom: 32px; font-weight: 700; line-height: 1.3;">
                  This is not another app, this is a lifeline.
                </h1>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Hi${name ? " " + name : ""},
                </p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Thanks for joining! We're building Parentis because we've experienced firsthand the insane number of apps and emails modern parents juggle.
                </p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Parentis uses AI to extract all your kids' school and sports chaos, sync it automatically to your existing calendar, and provide weekly Sunday reports for the next few weeks so you can easily manage everything in one place.
                </p>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                  <strong>We'll email you when we launch. Early waitlist members get 50% off for life.</strong>
                </p>
                
                <p style="font-size: 16px; margin-bottom: 8px;">
                  All the best,
                </p>
                
                <p style="font-size: 16px; margin-bottom: 32px;">
                  Team Parentis
                </p>
                
                <div style="margin-top: 40px;">
                  <img src="/images/parentis-20logo-20no-20bk.png" alt="Parentis" style="max-width: 200px; height: auto;" />
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
