import React from 'react';
import { Outlet } from 'react-router';

const AgentHome = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AgentHome;