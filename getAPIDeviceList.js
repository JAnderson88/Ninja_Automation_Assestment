import fetch from 'node-fetch';

module.exports = async () => {
    let response = await fetch('http://localhost:3000/devices');
    return await response.json();
}