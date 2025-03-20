import React, { useState } from "react";
import "./dashboardstyles/DashboardOverview.css";
import { Link } from "react-router-dom";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const DashboardOverview = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [pinnedBuses, setPinnedBuses] = useState([]);
    const [fromInputValue, setFromInputValue] = useState(""); // Store input value for "From"
    const [toInputValue, setToInputValue] = useState(""); // Store input value for "To"
    const [filteredFromSuggestions, setFilteredFromSuggestions] = useState([]); // Filtered "From" suggestions
    const [filteredToSuggestions, setFilteredToSuggestions] = useState([]); // Filtered "To" suggestions

    const booking_bus = [
        { id: "RAC843Kg", direction: "kimironko - zindiro", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kimironko - Downtown", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "Nyanza - Downtown", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "Remera - Gikondo", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "Nyamirambo - nyabugogo", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kimironko - zindiro", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kimironko - Downtown", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "kinyinya - nyabugogo", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "nyabugogo- kinyinya", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "Nyamirambo - nyabugogo", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" },
        { id: "RAC843Kg", direction: "Nyamirambo - nyabugogo", type: "Royal", title: "Departure Time", time: "8:00 am", arrival: "Arrival Time", time2: "8:30 am", cost: "217 rwf", Description: "Travel Cost" }       
    ];
    
    const popular_places = ["Nyabugogo", "Kimironko", "Kimisagara", "Nyamirambo", "Remera", "Gikondo", "Nyanza", "Kabuga", "Busanza", "Kinyinya"];

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
        <div className="overview_container">
            <div className="dash_over_container">
                <div className='upper'>
                    <div className="upper_overview">
                        <br /><br /><br />
                        <h2>Find Your Bus</h2>
                        <p>If you do not find the bus on the list, it is because we are still working on it</p>
                    </div>
                    <div className="the_select_boxes">
                        <div className='from_bx'>
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
                        <div className='arrow_icon'>
                        <FaArrowRightArrowLeft />
                        </div>
                        <div className='To_bx'>
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
                        <div className='search_icon'><IoSearchCircleSharp /></div>
                    </div>
                    <div className='mylocation'>
                        <div className='location_overview'>Location</div>
                        <div className='Routes_overview'>Route ID</div>
                    </div>
                </div>

                {/* Filter Options (All Buses, Pinned) */}
                <div className='myoptions'>
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
                <div className="tags">
                    <p>Most popular</p>
                    <div className="most_popular">
                        {popular_places.map((place, index) => (
                            <div
                                key={index}
                                className="myplace"
                                onClick={() => setSelectedFilter(place)}
                                style={{ cursor: "pointer", backgroundColor: selectedFilter === place ? "#ddd" : "#fff" }}
                            >
                                <p>{place}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bus Booking Cards */}
                <div className="booking_cards">
                    {filteredBuses.length > 0 ? (
                        filteredBuses.map((bus, index) => (
                            <div key={index} className="bus">
                                <div className="left_card">
                                    <div className="myid">{bus.id}</div>
                                    <div className="mydirection">{bus.direction}</div>
                                    <div className="mytype">{bus.type}</div>
                                    <hr />
                                    <div className="time">
                                        <div className="departure">
                                            <p className="title">{bus.title}</p>
                                            <p>{bus.time}</p>
                                        </div>
                                        <div className="Arrival">
                                            <p className="arrival">{bus.arrival}</p>
                                            <p>{bus.time2}</p>
                                        </div>
                                    </div>
                                    <div className="pinme" onClick={() => togglePin(bus)} style={{ cursor: "pointer", color: pinnedBuses.includes(bus) ? "red" : "black" }}>
                                        {pinnedBuses.includes(bus) ? "Unpin" : "Pin"}
                                    </div>
                                </div>
                                <div className="Right_card">
                                    <div className="price">
                                        <p className="mycost">{bus.cost}</p>
                                        <p className="mydescript">{bus.Description}</p>
                                        <button className="btn1"><Link to="/BusTracker">Track Bus</Link></button><br />
                                        <button className="btn2">More info</button>
                                        <p className="report">Report a problem</p>
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

export default DashboardOverview;
