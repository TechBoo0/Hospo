import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Doctors() {
    const [doctors, setDoctors] = useState([]);

    // useEffect(() => {
    //     // Fetch doctors from API
    //     const fetchDoctors = async () => {
    //         const response = await fetch('/api/doctors');
    //         const data = await response.json();
    //         setDoctors(data);
    //     };
    //     fetchDoctors();
    // }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            setDoctors([
               {                  "id": 1,
                  "name": "Dr. Vamsi",
                  "description": "Cardiologist with 10 years of experience.",
                  "email":"mohana.gangisetti@kalvium.community",
                  "image": "https://avatars.githubusercontent.com/u/145451553?v=4"
},
                {
                  "id": 1,
                  "name": "Dr. Jatin Jaydev",
                  "description": "Cardiologist with 10 years of experience.",
                  "email":"jatin.batchu@kalvium.community",
                  "image": "https://media.licdn.com/dms/image/v2/D5603AQFXf2O2E8ZUOw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723775958106?e=1732752000&v=beta&t=nuxuA3anGSLXX_8A7fJLKirAiUzP7p2Qatx6Dx9fl-U"
                },
               
                {
                  "id": 134,
                  "name": "Dr. Vinay Ready",
                  "description": "Cardiologist with 10 years of experience.",
                  "email":"vinnugollakoti289@gmail.com",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 2,
                  "name": "Dr. Jane Smith",
                  "description": "Pediatrician specialized in child healthcare.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 3,
                  "name": "Dr. Michael Johnson",
                  "description": "Neurologist with expertise in brain disorders.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 4,
                  "name": "Dr. Sarah Brown",
                  "description": "Dermatologist focusing on skin treatments.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 5,
                  "name": "Dr. Emily Wilson",
                  "description": "Orthopedic surgeon for bone and joint issues.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 6,
                  "name": "Dr. Matthew Davis",
                  "description": "Oncologist specializing in cancer treatment.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 7,
                  "name": "Dr. Olivia Garcia",
                  "description": "Gynecologist with expertise in women's health.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 8,
                  "name": "Dr. William Martinez",
                  "description": "Pulmonologist specializing in respiratory issues.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 9,
                  "name": "Dr. Sophia Rodriguez",
                  "description": "Endocrinologist focusing on hormonal disorders.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 10,
                  "name": "Dr. David Lee",
                  "description": "Psychiatrist specializing in mental health.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 11,
                  "name": "Dr. Isabella Walker",
                  "description": "Ophthalmologist focusing on eye care.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 12,
                  "name": "Dr. James Hall",
                  "description": "Gastroenterologist for digestive system diseases.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 13,
                  "name": "Dr. Mia Allen",
                  "description": "Rheumatologist focusing on autoimmune diseases.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 14,
                  "name": "Dr. Jacob Young",
                  "description": "Nephrologist specializing in kidney diseases.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 15,
                  "name": "Dr. Emma King",
                  "description": "Urologist specializing in urinary tract issues.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 16,
                  "name": "Dr. Alexander Scott",
                  "description": "Allergist specialized in allergy treatment.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 17,
                  "name": "Dr. Lucas Green",
                  "description": "Immunologist focusing on immune system disorders.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 18,
                  "name": "Dr. Charlotte Adams",
                  "description": "Anesthesiologist with expertise in pain management.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 19,
                  "name": "Dr. Ethan Baker",
                  "description": "Hematologist focusing on blood disorders.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 20,
                  "name": "Dr. Amelia Rivera",
                  "description": "Radiologist specializing in medical imaging.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 21,
                  "name": "Dr. Logan Campbell",
                  "description": "ENT specialist focusing on ear, nose, and throat.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 22,
                  "name": "Dr. Abigail Sanchez",
                  "description": "Podiatrist focusing on foot and ankle conditions.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 23,
                  "name": "Dr. Mason Phillips",
                  "description": "Plastic surgeon with a focus on reconstructive surgery.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 24,
                  "name": "Dr. Harper Mitchell",
                  "description": "Geriatrician specializing in elderly care.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 25,
                  "name": "Dr. Elijah Perez",
                  "description": "Vascular surgeon focusing on blood vessel issues.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 26,
                  "name": "Dr. Evelyn Roberts",
                  "description": "Pathologist specializing in disease diagnosis.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 27,
                  "name": "Dr. Henry Turner",
                  "description": "Infectious disease specialist for contagious illnesses.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 28,
                  "name": "Dr. Mila Parker",
                  "description": "Emergency medicine doctor for urgent care.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 29,
                  "name": "Dr. Daniel White",
                  "description": "Physiatrist specializing in rehabilitation and recovery.",
                  "image": "https://via.placeholder.com/150"
                },
                {
                  "id": 30,
                  "name": "Dr. Lily Harris",
                  "description": "Dentist focusing on oral health and treatments.",
                  "image": "https://via.placeholder.com/150"
                }
              ]
              );
        };
        fetchDoctors();
    }, []);
    

    return (
        <div className="bg-DEFFDA min-h-screen p-8">
            <h1 className="text-3xl font-bold text-black mb-6">Doctors List</h1>
            <ul className="space-y-4">
                {doctors.map(doctor => (
                    <li key={doctor.id} className="  bg-transparent  hover:shadow-2xl border border-black p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full mr-4" />
                            <div>
                                <span className=" font-bold">{doctor.name}</span>
                                <p className="text-gray-600">{doctor.description}</p>
                            </div>
                        </div>
                        <Link to={`/medcardreg/67e84c99bf7088984573a180`} className="bg-[#2E3434] p-2 rounded-lg text-[#DEFFDA] hover:bg-transparent hover:text-[#2E3434] border border-black font-semibold">
                            Book Appointment
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Doctors;
