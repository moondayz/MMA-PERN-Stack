import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");

    const getProfile = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { jwt_token: localStorage.token }

            });

            // returns an empty object
           const parseData = await JSON.parse(JSON.stringify(response));
        //  const parseData = await response.json();
            console.log(parseData);
            setName(parseData.firstname);
        } catch (err) {
            console.error(err.message);
        }
    };

    const logout = async e => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("Logout successfully");
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    // [] --> makes only one request when its rendered

    return (
        <div>
            <h1 className="mt-5 ml-5 "  >Membership Management App</h1>
           <hr/>
            <h3>Welcome to the dashboard page {name}</h3>
            <button onClick={e => logout(e)} className="btn btn-primary">
                Logout
        </button>
        </div>
    );
};

export default Dashboard;