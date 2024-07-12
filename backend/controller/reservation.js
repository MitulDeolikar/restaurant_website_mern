import { sendReservationSMS } from '../services/twilioService.js';
import { Reservation } from '../models/reservationSchema.js';
import ErrorHandler from '../error/error.js';

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !time) {
        return next(new ErrorHandler("Please enter all the details", 400));
    }

    try {
        const existingReservation = await Reservation.findOne({ email, date, time });
        if (existingReservation) {
            return next(new ErrorHandler("You already have a reservation for this date and time.", 400));
        }

        await Reservation.create({ firstName, lastName, email, phone, date, time });

        sendReservationSMS(phone, { firstName, lastName, date, time });

        res.status(200).json({
            success: true,
            message: "Reservation Successful. Enjoy your meal!",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            return next(new ErrorHandler(validationErrors.join(","), 400));
        }
        return next(error);
    }
};
