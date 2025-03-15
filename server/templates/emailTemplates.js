const templates = {
  elonMusk: {
    name: "Elon Musk",
    from: "Elon Bot <elon_musk@umangcodes.tech>",
    templates: {
      weeklyCheck: {
        subject: "Weekly Progress Check",
        html: (recipientName) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2D3748; margin-bottom: 24px;">Hey${
              recipientName ? " " + recipientName : ""
            }! 🚀</h2>
            <p style="color: #4A5568; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              Time for our weekly sync. Let's be efficient:
            </p>
            <div style="background: #F7FAFC; border-left: 4px solid #3182CE; padding: 16px; margin-bottom: 24px;">
              <p style="color: #2D3748; font-size: 16px; margin: 0;">What did you get done this week?</p>
            </div>
            <p style="color: #4A5568; font-size: 16px; line-height: 1.5;">
              Keep it brief and focused on impact.
            </p>
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E2E8F0;">
              <p style="color: #718096; font-size: 14px; margin: 0;">Best,</p>
              <p style="color: #2D3748; font-size: 16px; font-weight: bold; margin: 8px 0 0;">Elon Musk</p>
              <p style="color: #718096; font-size: 14px; margin: 4px 0 0;">CEO, Tesla & SpaceX</p>
            </div>
          </div>
        `,
      },
      reminder: {
        subject: "Quick Reminder: Weekly Update",
        html: (recipientName) => `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2D3748; margin-bottom: 24px;">Hey${
              recipientName ? " " + recipientName : ""
            } ⚡</h2>
            <p style="color: #4A5568; font-size: 16px; line-height: 1.5;">
              Haven't heard from you yet. Need that update to optimize our feedback loop.
            </p>
            <div style="background: #F7FAFC; border-left: 4px solid #3182CE; padding: 16px; margin: 24px 0;">
              <p style="color: #2D3748; font-size: 16px; margin: 0;">Quick update on your week?</p>
            </div>
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E2E8F0;">
              <p style="color: #718096; font-size: 14px; margin: 0;">Best,</p>
              <p style="color: #2D3748; font-size: 16px; font-weight: bold; margin: 8px 0 0;">Elon Musk</p>
              <p style="color: #718096; font-size: 14px; margin: 4px 0 0;">CEO, Tesla & SpaceX</p>
            </div>
          </div>
        `,
      },
    },
  },
  steveJobs: {
    name: "Steve Jobs",
    from: "Steve Bot <elon_musk@umangcodes.tech>",
    templates: {
      weeklyCheck: {
        subject: "This Week's Progress",
        html: (recipientName) => `
          <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1D1D1F; margin-bottom: 24px;">Hello${
              recipientName ? " " + recipientName : ""
            }</h2>
            <p style="color: #1D1D1F; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
              I hope you're crafting something insanely great this week.
            </p>
            <div style="background: #F5F5F7; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="color: #1D1D1F; font-size: 16px; margin: 0; font-weight: 500;">
                What's the story of your week? What did you make that pushes the boundaries of what's possible?
              </p>
            </div>
            <p style="color: #1D1D1F; font-size: 16px; line-height: 1.5;">
              Remember: Great work is in the details. Make it simple but significant.
            </p>
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #D2D2D7;">
              <p style="color: #86868B; font-size: 14px; margin: 0;">Think Different,</p>
              <p style="color: #1D1D1F; font-size: 16px; font-weight: 500; margin: 8px 0 0;">Steve Jobs</p>
              <p style="color: #86868B; font-size: 14px; margin: 4px 0 0;">Apple Inc.</p>
            </div>
          </div>
        `,
      },
      reminder: {
        subject: "A Thousand Songs in Your Pocket (and One Missing Update)",
        html: (recipientName) => `
          <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1D1D1F; margin-bottom: 24px;">Hello${
              recipientName ? " " + recipientName : ""
            }</h2>
            <p style="color: #1D1D1F; font-size: 16px; line-height: 1.5;">
              In the time it takes to listen to one song, you can share your weekly progress.
            </p>
            <div style="background: #F5F5F7; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <p style="color: #1D1D1F; font-size: 16px; margin: 0; font-weight: 500;">
                What's the one thing you're most proud of this week?
              </p>
            </div>
            <p style="color: #1D1D1F; font-size: 16px; line-height: 1.5;">
              Simplicity is the ultimate sophistication. Keep it brief.
            </p>
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #D2D2D7;">
              <p style="color: #86868B; font-size: 14px; margin: 0;">Think Different,</p>
              <p style="color: #1D1D1F; font-size: 16px; font-weight: 500; margin: 8px 0 0;">Steve Jobs</p>
              <p style="color: #86868B; font-size: 14px; margin: 4px 0 0;">Apple Inc.</p>
            </div>
          </div>
        `,
      },
    },
  },
};

module.exports = templates; 