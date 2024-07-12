import twilio from 'twilio';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from config.env
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });



if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
  throw new Error('Twilio credentials are missing in the environment variables');
}

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendReservationSMS = (to, reservationDetails) => {
  const message = `Thank you for your reservation, ${reservationDetails.firstName} ${reservationDetails.lastName}. Here are your details:\nDate: ${reservationDetails.date}\nTime: ${reservationDetails.time}`;

  client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to,
  })
  .then(message => console.log(`Message sent: ${message.sid}`))
  .catch(error => console.error('Error sending SMS:', error));
};
