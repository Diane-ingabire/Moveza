import React, { useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../Styles/invoice.css";
import logo from "../assets/logo (2).png";

const Ticket = () => {
  const ticketRef = useRef();

  const ticketDetails = {
    billNo: "465",
    pricePerSeat: "NPR 1600/seat",
    totalPrice: "NPR 6400",
    date: "2024-10-31",
    name: "Ram Bahadur Ghale",
    totalSeats: "A2, A3, A4, B6",
    totalPassengers: "04 Only",
    pickupStation: "Swoyambhu, KTM",
    from: "Kathmandu (buspark)",
    departureTime: "06:15 PM"
  };

  const downloadTicket = () => {
    const ticketElement = ticketRef.current;
    html2canvas(ticketElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("bus_ticket.pdf");
    });
  };

  return (
    <div className="ticket-container">
      <h2 className="invoice-title">Collect Your Invoice</h2>
      <div className="ticket-wrapper" ref={ticketRef}>
        {/* Main Ticket */}
        <div className="ticket-card">
          <div className="ticket-header">
            <img src={logo} alt="Bus Logo" className="bus-logo" />
            <div>
              <h3 className="bus-name">SWORGADWARI DELUXE</h3>
              <p className="bus-info">(Bus No. Ba. 2 Kha 9704)</p>
            </div>
          </div>
          <div className="ticket-details">
            <div className="left-section">
              <p><strong>Name:</strong> {ticketDetails.name}</p>
              <p><strong>Total Seat No:</strong> {ticketDetails.totalSeats}</p>
              <p><strong>Passengers:</strong> {ticketDetails.totalPassengers}</p>
              <p><strong>Pickup Station:</strong> {ticketDetails.pickupStation}</p>
              <p><strong>Price:</strong> {ticketDetails.pricePerSeat}</p>
              <p className="bill-paid">Bill Paid ✅</p>
            </div>
            <div className="right-section">
              <QRCode value="https://your-ticket-url.com" size={90} />
            </div>
          </div>
          <div className="ticket-footer">
            <p className="footer-text">From: {ticketDetails.from}</p>
            <p><strong>Arrival:</strong> 05:45 PM</p>
            <p><strong>Departure:</strong> {ticketDetails.departureTime}</p>
          </div>
        </div>
        <div className="side-info">
          <h2 className="bus-ticket">Bus Ticket</h2>
          <p><strong>Bill No.:</strong> {ticketDetails.billNo}</p>
          <p><strong>Date:</strong> {ticketDetails.date}</p>
          <p><strong>Name:</strong> {ticketDetails.name}</p>
          <p><strong>From:</strong> {ticketDetails.from}</p>
          <p><strong>Dept. Time:</strong> {ticketDetails.departureTime}</p>
          <p><strong>Seat No:</strong> {ticketDetails.totalSeats}</p>
          <p><strong>Total Passenger:</strong> {ticketDetails.totalPassengers}</p>
          <p><strong>Total Price:</strong> {ticketDetails.totalPrice}</p>
        </div>
      </div>
      {/* Download Button for Screen Only */}
      <button className="download-btn" onClick={downloadTicket}>Download Invoice</button>
    </div>
  );
};

export default Ticket;
