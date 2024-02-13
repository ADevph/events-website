import React from 'react';
import PastEvent from './PresentEvent';

const AllEvents = () => {
    return (
        <div>
            <h1 className='text-blue-800 text-center font-semibold text-xl underline mb-8'>Past Events</h1>
            <PastEvent />

        </div>
    );
};

export default AllEvents;