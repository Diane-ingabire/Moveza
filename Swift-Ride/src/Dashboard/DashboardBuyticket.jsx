import React, { useState } from "react";
import "./dashboardstyles/DashboardOverview.css";
import { Link } from "react-router-dom";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const DashboardBuyTicket = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [pinnedBuses, setPinnedBuses] = useState([]);
    const [fromInputValue, setFromInputValue] = useState(""); // Store input value for "From"
    const [toInputValue, setToInputValue] = useState(""); // Store input value for "To"
    const [filteredFromSuggestions, setFilteredFromSuggestions] = useState([]); // Filtered "From" suggestions
    const [filteredToSuggestions, setFilteredToSuggestions] = useState([]); // Filtered "To" suggestions

    const booking_bus = [

        { id: "RAC843Kg", direction: "kigali - Nyamagabe", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "12:00 am", cost: "6000 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kigali - Rwamagana", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "10:00 am", cost: "1500 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "Kigali - Muhanga", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "9:30 am", cost: "1500 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kigali - Ruhango", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "10:00 am", cost: "2000 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "Kigali - Huye", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "11:00 am", cost: "3000 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kigali - Muhanga", type: "Royal", title: "Departure Time", time: "9:00 am", arrival: "Arrival Time", time2: "10:00 am", cost: "1500 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kigali - Rubavu", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "12:00 am", cost: "5000 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kigali - Nyanze", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kigali- Kayonza", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kigali - Rubavu", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kigali - Gicumbi", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" }       
    ];
    
    const popular_places = ["NYAMAGABE", "HUYE", "NYANZA", "RUBAVU", "RUHANGO", "RWAMAGANA", "MUHANGA", "KAYONZA", "GICUMBI"];

    // Handle the "From" input change
    const handleFromChange = (e) => {
        const value = e.target.value;
        setFromInputValue(value);

        // Filter suggestions based on input
        setFilteredFromSuggestions(
            popular_places.filter((place) =>
                place.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    // Handle the "To" input change
    const handleToChange = (e) => {
        const value = e.target.value;
        setToInputValue(value);

        // Filter suggestions based on input
        setFilteredToSuggestions(
            popular_places.filter((place) =>
                place.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    // Handle suggestion click
    const handleFromSuggestionClick = (suggestion) => {
        setFromInputValue(suggestion);
        setFilteredFromSuggestions([]);
    };

    const handleToSuggestionClick = (suggestion) => {
        setToInputValue(suggestion);
        setFilteredToSuggestions([]);
    };

    const togglePin = (bus) => {
        setPinnedBuses(prevPins =>
            prevPins.includes(bus) ? prevPins.filter(p => p !== bus) : [...prevPins, bus]
        );
    };

    // Filter buses based on selected filter
    let filteredBuses = booking_bus;
    if (selectedFilter === "pinned") {
        filteredBuses = pinnedBuses;
    } else if (popular_places.includes(selectedFilter)) {
        filteredBuses = booking_bus.filter(bus =>
            bus.direction.toLowerCase().includes(selectedFilter.toLowerCase())
        );
    }

    return (
        <div className="overview_container_usr">
            <div className="dash_over_container_usr">
                <div className='upper_usr'>
                    <div className="upper_overview_usr">
                        <br /><br /><br />
                        <h2>Get Yourself a seat</h2>
                        <p>If you do not find the bus on the list, it is because we are still working on it</p>
                    </div>
                    <div className="the_select_boxes_usr">
                        <div className='from_bx_usr'>
                            <input
                                type="text"
                                value={fromInputValue}
                                onChange={handleFromChange}
                                placeholder="From"
                            />
                            {filteredFromSuggestions.length > 0 && (
                                <ul>
                                    {filteredFromSuggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleFromSuggestionClick(suggestion)}>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className='arrow_icon_usr'>
                        <FaArrowRightArrowLeft />
                        </div>
                        <div className='To_bx_usr'>
                            <input
                                type="text"
                                value={toInputValue}
                                onChange={handleToChange}
                                placeholder="To"
                            />
                            {filteredToSuggestions.length > 0 && (
                                <ul>
                                    {filteredToSuggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleToSuggestionClick(suggestion)}>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className='search_icon_usr'><IoSearchCircleSharp /></div>
                    </div>
                    <div className='mylocation_usr'>
                        <div className='location_overview_usr'>Location</div>
                        <div className='Routes_overview_usr'>Route ID</div>
                    </div>
                </div>

                {/* Filter Options (All Buses, Pinned) */}
                <div className='myoptions_usr'>
                    <div
                        className={`allbuses ${selectedFilter === "all" ? "active" : ""}`}
                        onClick={() => setSelectedFilter("all")}
                        style={{ cursor: "pointer" }}
                    >
                        All Buses
                    </div>
                    <div
                        className={`pinned ${selectedFilter === "pinned" ? "active" : ""}`}
                        onClick={() => setSelectedFilter("pinned")}
                        style={{ cursor: "pointer" }}
                    >
                        Pinned ({pinnedBuses.length})
                    </div>
                </div>

                {/* Most Popular Places */}
                <div className="tags_usr">
                    <p>Most popular</p>
                    <div className="most_popular_usr">
                        {popular_places.map((place, index) => (
                            <div
                                key={index}
                                className="myplace_usr"
                                onClick={() => setSelectedFilter(place)}
                                style={{ cursor: "pointer", backgroundColor: selectedFilter === place ? "#ddd" : "#fff" }}
                            >
                                <p>{place}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bus Booking Cards */}
                <div className="booking_cards_usr">
                    {filteredBuses.length > 0 ? (
                        filteredBuses.map((bus, index) => (
                            <div key={index} className="bus_usr">
                                <div className="left_card_usr">
                                    <div className="myid_usr">{bus.id}</div>
                                    <div className="mydirection_usr">{bus.direction}</div>
                                    <div className="mytype_usr">{bus.type}</div>
                                    <hr />
                                    <div className="time_usr">
                                        <div className="departure_usr">
                                            <p className="title_usr">{bus.title}</p>
                                            <p>{bus.time}</p>
                                        </div>
                                        <div className="Arrival_usr">
                                            <p className="arrival_usr">{bus.arrival}</p>
                                            <p>{bus.time2}</p>
                                        </div>
                                    </div>
                                    <div className="pinme_usr" onClick={() => togglePin(bus)} style={{ cursor: "pointer", color: pinnedBuses.includes(bus) ? "red" : "black" }}>
                                        {pinnedBuses.includes(bus) ? "Unpin" : "Pin"}
                                    </div>
                                </div>
                                <div className="Right_card_usr">
                                    <div className="price_usr">
                                        <p className="mycost_usr">{bus.cost}</p>
                                        <p className="mydescript_usr">{bus.Description}</p>
                                        <button className="btn1_usr"><Link to="/Seats" className="linkbtn_usr">Book bus</Link></button><br />
                                        <button className="btn2_usr">More info</button>
                                        <p className="report_usr">Report a problem</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No buses available for {selectedFilter}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardBuyTicket;
