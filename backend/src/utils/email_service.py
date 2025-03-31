import smtplib
from email.mime.text import MIMEText

def send_email(to_email, subject, body):
    # Configure email settings (e.g., SMTP server, credentials)
    sender_email = "your_email@example.com"
    sender_password = "your_password"

    message = MIMEText(body)
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = to_email

    with smtplib.SMTP_SSL("smtp.example.com", 465) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, message.as_string())
