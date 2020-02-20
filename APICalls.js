import fetch from 'node-fetch';

module.exports.getDevices = async () => {
    let response = await fetch('http://localhost:3000/devices');
    return await response.json();
}

module.exports.deleteDevice = async (id) => {
    let response = 
        await fetch(`http://localhost:3000/devices/${id}`, {
            method: "delete"
        })
    return await response.json()
}

module.exports.updateDevices = async (id, system_name, type, hdd_capacity) => {
    let response = 
        await fetch(`http://localhost:3000/devices/${id}`, {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                system_name: system_name, 
                type: type, 
                hdd_capacity: hdd_capacity
            })
        })
    return await response.json()
}