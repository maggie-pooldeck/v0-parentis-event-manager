// File: app/api/waitlist/route.js

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, numKids } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return Response.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Add contact to Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name || '',
          NUM_KIDS: numKids || ''
        },
        listIds: [6],
        updateEnabled: true
      })
    });

    if (brevoResponse.ok || brevoResponse.status === 204) {
      // Send welcome email
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify({
          sender: {
            name: 'Parentis',
            email: 'hello@parentis.app'
          },
          to: [{ email: email, name: name || '' }],
          subject: "You're on the Parentis waitlist!",
          htmlContent: `
            <html>
              <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #6477D5;">Welcome to Parentis!</h2>
                <p>Hi${name ? ' ' + name : ''},</p>
                <p>Thanks for joining the Parentis waitlist. We're building something special to help parents like you escape the chaos of managing multiple school and sports apps.</p>
                <p><strong>What's next?</strong></p>
                <ul>
                  <li>We'll email you as soon as Parentis launches (expected January 2025)</li>
                  <li>Early waitlist members get special pricing</li>
                  <li>You'll be among the first to try it out</li>
                </ul>
                <p>In the meantime, feel free to reply to this email with any questions or feedback!</p>
                <p>Best,<br>The Parentis Team</p>
              </body>
            </html>
          `
        })
      });

      return Response.json(
        { success: true, message: 'Successfully joined waitlist!' },
        { status: 200 }
      );
    } else {
      const errorData = await brevoResponse.json();
      console.error('Brevo error:', errorData);
      return Response.json(
        { error: 'Failed to add to waitlist. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Waitlist API error:', error);
    return Response.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
