import React from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import "../Styles/service.css"; 

const servicesData = [
    {
        icon: RiSecurePaymentLine,
        title: "Secure Payment",
        desc: "Track your bus in real-time and never miss your ride again. Get accurate ETAs and route information."
    },
    {
        icon: RiSecurePaymentLine,
        title: "Online Booking",
        desc: "Easily book your tickets online and avoid long queues at the bus station."
    },
    {
        icon: RiSecurePaymentLine,
        title: "Customer Support",
        desc: "24/7 customer support to assist with your travel needs and inquiries."
    }
];

const Service = () => {
    return (
        <div className="services-container">
            <h1 className="services-title">
                Our <span className="highlight">Services</span>
            </h1>
            <div className="services-grid">
                {servicesData.map((service, index) => (
                    <div key={index} className="service-card">
                        <div className="service-header">
                            <div className="service-icon">
                                <service.icon className="icon" />
                            </div>
                            <h1 className="service-title">{service.title}</h1>
                        </div>
                        <p className="service-desc">{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Service;
