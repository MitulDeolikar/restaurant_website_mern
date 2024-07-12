import React, { useState } from 'react';
import axios from 'axios';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Reservation = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Get current time in HH:MM format
    const currentTime = new Date().toTimeString().split(' ')[0].substring(0, 5);

    const handleReservation = async (e) => {
        e.preventDefault();

        // Get the current date and time
        const currentDate = new Date();
        const selectedDate = new Date(`${date}T${time}`);

        // Check if the selected date and time are before the current date and time
        if (selectedDate < currentDate) {
            toast.error("Reservations cannot be made for past dates or times.");
            return;
        }

        // Validate time ranges
        const selectedHour = selectedDate.getHours();
        const selectedMinutes = selectedDate.getMinutes();
        const isWithinFirstRange = (selectedHour === 12 && selectedMinutes >= 0) || (selectedHour === 15 && selectedMinutes === 0) || (selectedHour > 12 && selectedHour < 15);
        const isWithinSecondRange = (selectedHour === 19 && selectedMinutes >= 0) || (selectedHour === 23 && selectedMinutes === 0) || (selectedHour > 19 && selectedHour < 23);
        if (!isWithinFirstRange && !isWithinSecondRange) {
            toast.error("Reservations can only be made between 12:00 PM - 3:00 PM and 7:00 PM - 11:00 PM.");
            return;
        }

        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/reservation/send",
                { firstName, lastName, email, phone, date, time },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setTime("");
            setDate("");
            navigate("/success");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "An error occurred");
        }
    }

    return (
        <section className='reservation' id='reservation'>
            <div className="container">
                <div className="banner">
                    <img src="/reservation.png" alt="res" />
                </div>
                <div className="banner">
                    <div className="reservation_form_box">
                        <h1>Reserve your Table</h1>
                        <p>For further questions, please contact us!</p>
                        <form onSubmit={handleReservation}>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder='First Name' 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    required 
                                />
                                <input 
                                    type="text" 
                                    placeholder='Last Name' 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <input 
                                    type="date" 
                                    placeholder='Date' 
                                    value={date} 
                                    onChange={(e) => setDate(e.target.value)} 
                                    min={today} 
                                    required 
                                />
                                <input 
                                    type="time" 
                                    placeholder='Time' 
                                    value={time} 
                                    onChange={(e) => setTime(e.target.value)} 
                                    required 
                                    list="time-options"
                                />
                                <datalist id="time-options">
                                    <option value="12:00" />
                                    <option value="12:30" />
                                    <option value="13:00" />
                                    <option value="13:30" />
                                    <option value="14:00" />
                                    <option value="14:30" />
                                    <option value="15:00" />
                                    <option value="19:00" />
                                    <option value="19:30" />
                                    <option value="20:00" />
                                    <option value="20:30" />
                                    <option value="21:00" />
                                    <option value="21:30" />
                                    <option value="22:00" />
                                    <option value="22:30" />
                                    <option value="23:00" />
                                </datalist>
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    placeholder='Email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                                <input 
                                    type="tel" 
                                    placeholder='Mobile no.' 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type='submit'>
                                Reserve <span><HiOutlineArrowNarrowRight/></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reservation;
