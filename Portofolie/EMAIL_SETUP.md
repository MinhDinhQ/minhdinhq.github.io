# Email Form Setup Guide

This guide will help you set up the contact form to send emails directly to your inbox using EmailJS (100% free).

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (it's completely free - 200 emails/month)
3. Sign up with your Google account or email

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the left sidebar
2. Click **Add New Service**
3. Choose your email provider (Gmail is recommended)
4. Click **Connect Account** and follow the instructions
5. **Copy the Service ID** (something like `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Set up your template with these variables:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{email}}
Subject: {{subject}}

Message:
{{message}}
```

4. **Copy the Template ID** (something like `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the left sidebar
2. Find your **Public Key** (something like `abc123XYZ`)
3. Copy this key

## Step 5: Update Your Website

1. Open the file: `script.js`
2. Find these lines at the top (around line 97-99):

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

3. Replace with your actual values:

```javascript
const EMAILJS_PUBLIC_KEY = 'abc123XYZ';           // From Step 4
const EMAILJS_SERVICE_ID = 'service_abc123';      // From Step 2
const EMAILJS_TEMPLATE_ID = 'template_xyz789';    // From Step 3
```

4. Save the file

## Step 6: Test Your Form

1. Open `index.html` in your browser
2. Scroll to the contact form
3. Fill it out and submit
4. You should receive an email at: **Minhdinhquan1@gmail.com**

## Email Template Variables

Make sure your EmailJS template uses these variable names (they match your form fields):

- `{{from_name}}` - Visitor's name
- `{{email}}` - Visitor's email
- `{{subject}}` - Subject line
- `{{message}}` - Message content

## Troubleshooting

### Form not sending?
1. Check browser console (F12) for errors
2. Verify all three IDs are correct in `script.js`
3. Make sure your EmailJS service is connected and active

### Not receiving emails?
1. Check your spam folder
2. Verify the email address in your EmailJS service settings
3. Test by sending from EmailJS dashboard first

### Need more emails?
- Free plan: 200 emails/month
- Paid plans start at $7/month for 1,000 emails

## Alternative: Using Your Own Email Server

If you prefer to use your own backend, you can replace the EmailJS code with:

### Option 1: PHP Backend
```php
<?php
$to = "Minhdinhquan1@gmail.com";
$subject = $_POST['subject'];
$message = $_POST['message'];
mail($to, $subject, $message);
?>
```

### Option 2: Node.js Backend
Use Nodemailer with Express.js

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Your email: Minhdinhquan1@gmail.com
- Phone: +45 91989553

---

**Note:** EmailJS is completely free for up to 200 emails per month, which is perfect for a portfolio website!
