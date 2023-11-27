import React from 'react';
import axios from 'axios';

function TestAPI() {
    const sendDataToServer = () => {
        axios.post('http://127.0.0.1:5000/test', {
            sampleData: 'Hello World'
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <button onClick={sendDataToServer}>Test API</button>
        </div>
    );
}

export default TestAPI;