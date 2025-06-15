import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import  api  from '../api';

function MedCardReg() {
    const { doctorId } = useParams();
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        registrationType: 'online',
        symptoms: [],
        medications: [],
        date: '',
        deliveryRequired: false,
        doctorId: doctorId,
    });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (id === 'deliveryRequired') {
                setFormData((prevData) => ({
                    ...prevData,
                    deliveryRequired: checked,
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    const handleSymptomsChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const updatedSymptoms = checked
                ? [...prevData.symptoms, value]
                : prevData.symptoms.filter((symptom) => symptom !== value);
            return { ...prevData, symptoms: updatedSymptoms };
        });
    };

    const handleMedicationsChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const updatedMedications = checked
                ? [...prevData.medications, value]
                : prevData.medications.filter((medication) => medication !== value);
            return { ...prevData, medications: updatedMedications };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axios.post(`${api}/register`, formData)
            .then(response => {
                console.log('Success:', response.data);
                toast.success("Thanks for choosing Hospo. Your doctor will send you an email.", { position: "top-right" });
                localStorage.setItem("delivery", response.data.delivery);
                localStorage.setItem("name",response.data.name)
                localStorage.setItem("email",response.data.email)
                nav("/");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="flex bg-DEFFDA h-screen overflow-hidden">
            <div className="w-1/2 p-8 overflow-scroll scrollbar-thin overflow-x-hidden">
                <h2 className="text-2xl font-bold text-black mb-6 text-center">Patient Registration</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black font-semibold mb-1">Name:</label>
                        <input type="text" id="name" value={formData.name} onChange={handleChange} required className="border border-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-black font-semibold mb-1">Email:</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} required className="border border-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-black font-semibold mb-1">Phone:</label>
                        <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required className="border border-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-black font-semibold mb-1">Address:</label>
                        <input type="text" id="address" value={formData.address} onChange={handleChange} required className="border border-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="registrationType" className="block text-black font-semibold mb-1">Registration Type:</label>
                        <select id="registrationType" value={formData.registrationType} onChange={handleChange} required className="border border-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black">
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-black font-semibold mb-1">Symptoms:</label>
                        <div className="flex flex-col">
                            {['Fever', 'Cough', 'Fatigue', 'Headache', 'Nausea'].map((symptom) => (
                                <label key={symptom} className="flex items-center">
                                    <input type="checkbox" value={symptom} onChange={handleSymptomsChange} className="mr-2" />
                                    {symptom}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="medications" className="block text-black font-semibold mb-1">Medications (If using any):</label>
                        {['Aspirin', 'Ibuprofen', 'Acetaminophen', 'Antibiotics', 'Antihistamines'].map((medication) => (
                            <label key={medication} className="flex items-center">
                                <input type="checkbox" value={medication} onChange={handleMedicationsChange} className="mr-2" />
                                {medication}
                            </label>
                        ))}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-black font-semibold mb-1">Date:</label>
                        <input type="date" id="date" value={formData.date} onChange={handleChange} required className="border border-black p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deliveryRequired" className="flex items-center">
                            <input type="checkbox" id="deliveryRequired" checked={formData.deliveryRequired} onChange={handleChange} className="mr-2" />
                            Delivery Required
                        </label>
                    </div>
                    <button type="submit" className="bg-green-400 text-black p-3 rounded-lg w-full hover:bg-opacity-80 transition duration-200">Register</button>
                </form>
            </div>
            <div className="w-1/2 h-screen mt-4 rounded-xl pl-32 pr-32 flex flex-col relative items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://www.tvguide.com/a/img/resize/2d3b5cbf268d04ca08ebaff6e5d15946ed91a252/hub/2017/12/07/3610b246-aa6c-4619-9118-c3c2494d8f06/gooddoctor2.jpg?auto=webp&fit=crop&height=1080&width=1920')" }}>
                <div className="bg-black absolute bottom-20 w-5/6 bg-opacity-50 text-white p-4 rounded-lg">
                    <h3 className="text-xl font-bold">Welcome to Our Clinic</h3>
                    <p className="mt-2">Our experienced doctors are here to help you with your health needs. Please fill out the registration form to get started.</p>
                </div>
            </div>
        </div>
    );
}
export default MedCardReg;
