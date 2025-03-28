import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import '../Styles/contact.css'

const Contact =() =>{
    return(<>
    <section className="contact">
        <div className="content_contact">
            <h2>Contact Us</h2>
            <p>
            Thank you for reaching out! We’d love to hear from you. Whether you have questions, 
            feedback, or just want to connect,
             this is the best place to get in touch. 
             Please fill out the form below, and
              we’ll get back to you as soon as possible. 
            </p>
        </div>
        <div className="container_contact">
            <div className="contactInfo">
                <div className="box_contact">
                    <div className="icon_contact">
                        <FaMapMarkerAlt className="icon"/>
                    </div>
                    <div className="text_contact">
                        <h3>Address</h3>
                        <p>SwiftRide 123 Main Street<br/>kigali,Rwanda<br/> 55060 </p>
                    </div>
                </div>

                <div className="box_contact">
                    <div className="icon_contact">
                      <FaPhoneAlt className="icon"/>
                    </div>
                    <div className="text_contact">
                        <h3>Phone</h3>
                        <p>+2507982334054</p>
                    </div>
                </div>
                <div className="box_contact">
                    <div className="icon_contact">
                        <MdEmail className="icon"/>
                    </div>
                    <div className="text_contact">
                        <h3>Email</h3>
                        <p>swiftride@gmail.com </p>
                    </div>
                </div>
            </div>
            <div class="contactForm">
               <form>
                <h2>Send Message</h2>
                <div className="inputBox_contact">
                <input type="text " name="" required="required"/>
                   <span>Full Name</span>
                </div>
                <div className="inputBox_contact">
                <input type="text " name="" required="required"/>
                   <span>Email</span>
                </div>
                <div className="inputBox_contact">
               <textarea require="required"></textarea>
                   <span>Type your Message...</span>
                </div>
                <div className="inputBox_contact">
                <input type="submit " name="" value="send"/>
                  
                </div>
               </form>
            </div>
        </div>

    </section>
    </>)
}
export default Contact 