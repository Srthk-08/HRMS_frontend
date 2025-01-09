import React, { useState, useEffect } from "react";
import graphImage from "../assets/hierarchyreact.png";
import graphImageMobile from "../assets/hierarchy-mobile.jpg"
import Profile from "../assets/profile.png";
import { Link, useOutletContext,  } from "react-router-dom";

const HierarchyGraph = () => {
  const { graphData, setGraphData } = useOutletContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const userDetails = {
    chairPerson: {
      name: "John",
      email: "chairperson@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "Chairperson",
      addposition: "Head",
      processby: "Head of Organization",
      processmanage: "Head of Organization",
      image: Profile,
    },
    hoa: {
      name: "HOA",
      email: "hoa@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "HOA",
      addposition: "Head",
      processby: "Head of Association",
      processmanage: "Head of Association",
      image: Profile,
    },
    poa: {
      name: "POA",
      email: "poa@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "POA",
      addposition: "Head",
      processby: "Head of Association",
      processmanage: "Head of Association",
      image: Profile,
    },
    president: {
      name: "President",
      email: "president@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "President",
      addposition: "Leader",
      processby: "Leader of the Community",
      processmanage: "Leader of the Community",
      image: Profile,
    },
    wisePresident: {
      name: "Wise President",
      email: "wisepresident@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "Wise President",
      addposition: "Support",
      processby: "Support to President",
      processmanage: "Support to President",
      image: Profile,
    },
    secretary: {
      name: "Secretary",
      email: "secretary@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "Secretary",
      addposition: "Coordinator",
      processby: "Assists President",
      processmanage: "Handles Administration",
      image: Profile,
    },
    treasurer: {
      name: "Treasurer",
      email: "treasurer@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "Treasurer",
      addposition: "Finance Head",
      processby: "Manages Finances",
      processmanage: "Oversees Budget",
      image: Profile,
    },
    propertyManagers: {
      name: "Property Manager",
      email: "propertymanager@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "Property Manager",
      addposition: "Operations Head",
      processby: "Handles Maintenance",
      processmanage: "Reports to HOA",
      image: Profile,
    },
    condominiumAssociation: {
      name: "Condominium Association",
      email: "condoassociation@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "Association",
      addposition: "Group Leader",
      processby: "Community Management",
      processmanage: "Coordinates Activities",
      image: Profile,
    },
    residentOwner: {
      name: "Resident Owner",
      email: "residentowner@example.com",
      mobile: "1258-7852",
      address: "India",
      position: "Resident Owner",
      addposition: "Community Member",
      processby: "Participates in Meetings",
      processmanage: "Communicates with HOA",
      image: Profile,
    },
  };
  const handleDivClick = (userKey) => {
    setSelectedUser(userDetails[userKey]);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };
  return (
    <div className="overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-0">  {/* Removed margin or added space here */}
          <h1 className="text-3xl font-semibold mb-2">Hierarchy Graph</h1>
          <h1 className="font-semibold">
            <Link to="/" className="mr-0">Dashboard </Link> / Hierarchy Graph {/* Add custom margin right to adjust spacing if needed */}
          </h1>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${isMobile ? graphImageMobile : graphImage})`, position: 'relative', top: '-170px',
        }}
        className="bg-contain bg-center h-[900px] bg-no-repeat "
      ></div>
      <div
        className="text-black text-[17px] relative bottom-[820px] left-[710px] font-semibold "
        onClick={() => handleDivClick("chairPerson")}
      >
        Chair Person
      </div>
      <div
        className=" text-black text-[17px] relative bottom-[715px] left-[325px] font-semibold"
        onClick={() => handleDivClick("hoa")}
      >
        HOA
      </div>
      <div
        className=" text-black text-[17px] relative bottom-[665px] left-[70px] font-semibold"
        onClick={() => handleDivClick("president")}
      >
        President
      </div>
      <div className="text-black text-[14px] relative bottom-[513px] left-[63px] font-semibold">
        <div>Community </div>
        <div>Guidelines</div>
      </div>
      <div className=" text-black text-[15px] relative bottom-[570px] left-[270px] font-semibold">
        Reporting
      </div>
      <div
        className="text-black text-[14px] relative bottom-[550px] left-[520px] bg-white w-[113px] font-semibold"
        onClick={() => handleDivClick("residentOwner")}
      >
        Resident/ Owners
      </div>
      <div
        className=" text-black text-[15px] relative bottom-[770px] left-[195px] font-semibold"
        onClick={() => handleDivClick("wisePresident")}
      >
        Wise President
      </div>
      <div
        className=" text-black text-[16px] relative bottom-[795px] left-[360px] font-semibold"
        onClick={() => handleDivClick("treasurer")}
      >
        Tresurer
      </div>
      <div
        className=" text-black text-[16px] relative bottom-[820px] left-[520px] font-semibold bg-white w-[50px] "
        onClick={() => handleDivClick("secretary")}
      >
        Secretry
      </div>
      <div
        className="text-black text-[14px] relative bottom-[859px] left-[690px] font-semibold"
        onClick={() => handleDivClick("propertyManagers")}
      >
        <div>Property</div>
        <div>Managers</div>
      </div>
      <div
        className=" text-black text-[17px] relative bottom-[955px] left-[885px] font-semibold"
        onClick={() => handleDivClick("poa")}
      >
        POA
      </div>
      <div
        className="text-black text-[14px] relative bottom-[880px] left-[880px] font-semibold"
        onClick={() => handleDivClick("propertyManagers")}
      >
        <div>Property</div>
        <div>Managers</div>
      </div>
      <div
        className="text-black text-[14px] relative bottom-[820px] left-[880px] font-semibold"
        onClick={() => handleDivClick("residentOwner")}
      >
        <div>Resident /</div>
        <div>Owners</div>
      </div>
      <div
        className="text-black text-[14px] relative bottom-[1090px] left-[1080px] font-semibold "
        onClick={() => handleDivClick("condominiumAssociation")}
      >
        <div>Condominium /</div>
        <div>Associations</div>
      </div>
      <div
        className="text-black text-[14px] relative bottom-[1030px] left-[1085px] font-semibold "
        onClick={() => handleDivClick("propertyManagers")}
      >
        <div>Property/</div>
        <div>Managers</div>
      </div>
      <div
        className="text-black text-[14px] relative bottom-[950px] left-[1085px] font-semibold "
        onClick={() => handleDivClick("residentOwner")}
      >
        <div>Resident/</div>
        <div>Owner</div>
      </div>
      <div className="text-black relative top-[-1270px] left-[295px] bg-white w-[70px] text-[11px] text-center text-center">
        manages
      </div>
      <div className="text-black relative top-[-1270px] left-[875px] bg-white w-[70px] text-[11px] text-center">
        manages
      </div>
      <div className="text-black relative top-[-1320px] left-[1095px] bg-white w-[70px] text-[11px] text-center">
        manages
      </div>
      <div className="text-black relative bottom-[1220px] left-[68px] bg-white w-[70px] text-[11px] text-center">
        Consists of
      </div>
      <div className="text-black relative bottom-[1235px] left-[195px] bg-white w-[70px] text-[11px] text-center">
        Consists of
      </div>
      <div className="text-black relative bottom-[1245px] left-[320px] bg-white w-[60px] text-[11px] text-center">
        Consists of
      </div>
      <div className="text-black relative bottom-[1257px] left-[450px] bg-white w-[70px] text-[11px] text-center">
        Consists of
      </div>
      <div className="text-black relative bottom-[1347px] left-[585px] bg-white w-[70px] text-[11px] text-center">
        Reports to
      </div>
      <div className="text-black relative bottom-[1155px] left-[185px] bg-white w-[70px] text-[11px] text-center">
        Approval
      </div>
      <div className="text-black relative bottom-[1120px] left-[140px] bg-white w-[70px] text-[11px] text-center">
        Reports to
      </div>
      <div className="text-black relative bottom-[1170px] left-[535px] bg-white w-[70px] text-[11px] text-center">
        Communicate decision to
      </div>
      <div className="text-black relative bottom-[1200px] left-[760px] bg-white w-[80px] text-[11px] text-center">
        Submit maintanance request to
      </div>
      <div className="text-black relative bottom-[1380px] left-[965px] bg-white w-[80px] text-[11px] text-center">
        Reports to
      </div>
      <div className="text-black relative bottom-[1308px] left-[970px] bg-white w-[80px] text-[11px] text-center text-center">
        Submit complaints request to
      </div>
      {/* Popup */}
      {selectedUser && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-[400px] flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={selectedUser.image}
              alt={selectedUser.name}
              className="w-24 h-24 rounded-full mb-4"
            />

            {/* Name and Position */}
            <h2 className="text-2xl font-bold mb-2">{selectedUser.name}</h2>
            <p className="text-lg font-semibold mb-4">
              {selectedUser.position}
            </p>

            {/* Details */}
            <div className="w-full">
              <p className="mb-2">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="mb-2">
                <strong>Mobile:</strong> {selectedUser.mobile}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {selectedUser.address}
              </p>
              <p className="mb-2">
                <strong>Process By:</strong> {selectedUser.processby}
              </p>
              <p className="mb-2">
                <strong>Process Manage:</strong> {selectedUser.processmanage}
              </p>
            </div>

            {/* Close Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HierarchyGraph;
