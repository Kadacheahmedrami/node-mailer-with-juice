**Project Configuration**

This document explains how to configure the environment variables used by the application, including how to set up your SMTP credentials and obtain the `SMTP_PASS` (SMTP password).

---

## 1. Prerequisites

* A working copy of the project repository on your local machine.
* Node.js ≥ 14, Python ≥ 3.7, or your project's required runtime installed.
* Access to an SMTP mail provider (e.g., Gmail, Outlook, or your organization’s mail server).

---

## 2. Environment Variables

The application uses environment variables to store sensitive information. These variables must be defined in a `.env` file in the project root.

### 2.1 `.env` File

Create a file named `.env` in the root of your project (next to `package.json`, `requirements.txt`, or equivalent) and add the following entries:

```dotenv
# SMTP credentials for sending emails
SMTP_USER=a_kadache@estin.dz
SMTP_PASS=YOUR_SMTP_PASSWORD
```

> **Note:** Do **not** commit your `.env` file to version control. Add it to your `.gitignore`.

---

## 3. How to Obtain `SMTP_PASS`

`SMTP_PASS` is the password (or app‑specific password) used to authenticate with your SMTP provider. The steps to obtain it vary depending on your mail service.

You can also watch this quick video tutorial for a step‑by‑step guide:

* 📺 [How to generate your SMTP App Password](https://www.youtube.com/watch?v=N_J3HCATA1c)

---

## 4. Verifying Your Setup

After creating your `.env` file with the correct values, restart your application. Look for success messages like:

```
SMTP connection established successfully.
```

If you encounter errors, verify:

* Your `SMTP_USER` is the full email address.
* Your `SMTP_PASS` is correct (especially watch for extra spaces or line breaks).
* Less secure apps / app passwords are enabled in your mail provider’s settings.

---

## 5. Security Considerations

* **Never** commit `.env` or plain‐text passwords to version control.
* Use environment‐specific secrets management in production (e.g., AWS Secrets Manager, Azure Key Vault, or Docker secrets).
* Rotate your SMTP password periodically for increased security.

---

*Document generated on May 10, 2025.*
