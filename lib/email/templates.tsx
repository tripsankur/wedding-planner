export function getInvitationEmailTemplate(guestName: string, accessToken: string, websiteUrl: string) {
  return {
    subject: "You're Invited to Our Wedding!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Wedding Invitation</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 32px;">You're Invited!</h1>
            <p style="margin: 10px 0 0; font-size: 18px; opacity: 0.9;">Join us for our special day</p>
          </div>
          
          <div style="padding: 40px 30px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Dear ${guestName},</p>
            
            <p style="margin-bottom: 20px;">We're thrilled to invite you to celebrate our wedding! Your presence would mean the world to us.</p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="margin: 0 0 10px; font-weight: 600;">Your Personal Access Code:</p>
              <p style="font-size: 24px; font-weight: bold; color: #667eea; margin: 0; letter-spacing: 2px;">${accessToken}</p>
            </div>
            
            <p style="margin-bottom: 20px;">Use this code to:</p>
            <ul style="margin-bottom: 30px;">
              <li>View event details and schedule</li>
              <li>RSVP and select your meal preferences</li>
              <li>Upload and view photos</li>
              <li>Stay updated with announcements</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${websiteUrl}/rsvp" style="display: inline-block; background: #667eea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Visit Wedding Website</a>
            </div>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              We can't wait to celebrate with you!<br>
              With love,<br>
              Sarah & Michael
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Dear ${guestName},

You're invited to our wedding!

Your Personal Access Code: ${accessToken}

Use this code to RSVP and access all wedding information at:
${websiteUrl}/rsvp

We can't wait to celebrate with you!

With love,
Sarah & Michael
    `,
  }
}

export function getRSVPConfirmationEmailTemplate(guestName: string, status: string, eventTitle: string) {
  const isAttending = status === "attending"

  return {
    subject: isAttending ? "RSVP Confirmed - We Can't Wait!" : "RSVP Received",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>RSVP Confirmation</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 40px 20px; background: ${isAttending ? "#10b981" : "#6b7280"}; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 32px;">${isAttending ? "See You There!" : "RSVP Received"}</h1>
          </div>
          
          <div style="padding: 40px 30px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi ${guestName},</p>
            
            <p style="margin-bottom: 20px;">
              ${
                isAttending
                  ? `We're so excited that you'll be joining us for ${eventTitle}! Your RSVP has been confirmed.`
                  : `Thank you for letting us know. We're sorry you can't make it to ${eventTitle}, but we appreciate you taking the time to respond.`
              }
            </p>
            
            ${
              isAttending
                ? `
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 30px 0;">
              <p style="margin: 0; font-weight: 600; color: #065f46;">What's Next?</p>
              <ul style="margin: 10px 0 0; padding-left: 20px; color: #065f46;">
                <li>Check your email for event details</li>
                <li>Upload photos to our gallery</li>
                <li>Stay tuned for announcements</li>
              </ul>
            </div>
            `
                : ""
            }
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              ${isAttending ? "Can't wait to celebrate with you!" : "Thank you for your response."}<br>
              Sarah & Michael
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${guestName},

${
  isAttending
    ? `We're so excited that you'll be joining us for ${eventTitle}! Your RSVP has been confirmed.`
    : `Thank you for letting us know. We're sorry you can't make it to ${eventTitle}.`
}

${isAttending ? "Can't wait to celebrate with you!" : "Thank you for your response."}

Sarah & Michael
    `,
  }
}

export function getPhotoApprovalEmailTemplate(guestName: string, websiteUrl: string) {
  return {
    subject: "Your Photo Has Been Approved!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Photo Approved</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 40px 20px; background: #667eea; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 32px;">Photo Approved!</h1>
          </div>
          
          <div style="padding: 40px 30px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi ${guestName},</p>
            
            <p style="margin-bottom: 20px;">Great news! Your photo has been approved and is now live in our wedding gallery.</p>
            
            <p style="margin-bottom: 30px;">Thank you for sharing this special moment with us!</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${websiteUrl}/gallery" style="display: inline-block; background: #667eea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">View Gallery</a>
            </div>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              With love,<br>
              Sarah & Michael
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${guestName},

Great news! Your photo has been approved and is now live in our wedding gallery.

Thank you for sharing this special moment with us!

View the gallery at: ${websiteUrl}/gallery

With love,
Sarah & Michael
    `,
  }
}
