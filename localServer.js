const axios = require("axios");
const si = require("systeminformation");
const { exec } = require("child_process");

// ✅ Get Disk Usage
const getLocalDriveUsage = async () => {
    let partitions = [];
    try {
        const drives = await si.fsSize();

        partitions = drives.map(drive => ({
            name: drive.mount,
            total: (drive.size / 1e9).toFixed(2) + " GB",
            free: (drive.available / 1e9).toFixed(2) + " GB",
            used: ((drive.used) / 1e9).toFixed(2) + " GB",
            percentUsed: drive.size > 0 ? ((drive.used / drive.size) * 100).toFixed(1) + "%" : "0%"
        }));
    } catch (error) {
        console.error("❌ Error fetching disk usage:", error.message);
    }
    return partitions;
};

// ✅ Get Monitor Details for All Connected Monitors
const getMonitorDetails = async () => {
    try {
        const displays = await si.graphics();
        return displays.displays.map(display => ({
            model: display.model && display.model !== "" ? display.model : "Unknown Monitor",
            resolution: `${display.currentResX} x ${display.currentResY}`,
            refreshRate: `${display.currentRefreshRate} Hz`,
            primary: display.main,
            connection: display.connection || "Unknown",
        }));
    } catch (error) {
        console.error("❌ Error fetching monitor details:", error.message);
        return [];
    }
};

// ✅ Get Refresh Rate (Windows Only)
const getRefreshRate = async () => {
    return new Promise((resolve) => {
        exec('wmic path Win32_VideoController get CurrentRefreshRate', (error, stdout) => {
            if (error) {
                console.error("❌ Error fetching refresh rate:", error.message);
                resolve(["N/A"]);
                return;
            }
            const rates = stdout.match(/\d+/g);
            resolve(rates ? rates.map(rate => `${rate} Hz`) : ["N/A"]);
        });
    });
};

// ✅ Get Audio Volume for Each Audio Output
const getAudioVolume = async () => {
    try {
        const audioDevices = await si.audio();
        
        return audioDevices
            .filter(device => device.default) // Only get the default active audio output
            .map(device => ({
                name: device.name || "Unknown Audio Device",
                volume: device.volume || 0,
                active: device.active || false,
                default: device.default || false,
            }));
    } catch (error) {
        console.error("❌ Error fetching audio volume:", error.message);
        return [];
    }
};

// ✅ Get FPS (GPU Utilization) for Each GPU (Requires Admin Access)
const getFPS = async () => {
    return new Promise((resolve) => {
        exec('nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits', (error, stdout) => {
            if (error) {
                console.error("❌ Error fetching FPS:", error.message);
                resolve([{ name: "NVIDIA GPU", fps: "N/A", memoryUsage: "N/A" }]);
                return;
            }
            const fpsValue = stdout.trim();
            resolve([
                {
                    name: "NVIDIA GeForce RTX 4060",
                    fps: `${fpsValue}%`, // Use the extracted GPU utilization as FPS
                    memoryUsage: "N/A",
                },
            ]);
        });
    });
};


// ✅ Send Data to Backend
const sendDataToBackend = async () => {
    const partitions = await getLocalDriveUsage();
    const monitorDetails = await getMonitorDetails();
    const refreshRates = await getRefreshRate();
    const audioDevices = await getAudioVolume();
    const fpsData = await getFPS();

    const data = {
        partitions,
        monitors: monitorDetails.map((monitor, index) => ({
            ...monitor,
            refreshRate: refreshRates[index] || monitor.refreshRate, // Assign refresh rate if available
        })),
        audio: audioDevices,
        fps: fpsData,
    };
    //console.log("✅ Data successfully:", data);

    try {
        const response = await axios.post(
            "https://api.pcstats.site/api/partitions",
            data,
            { headers: { "x-api-key": "026bc2a1c84e6efbe769fbba8cb3c6aaafb89cd05d3537314695ba57a3871a66" } }
        );

        //console.log("✅ Data sent successfully:", response.data);
    } catch (error) {
        console.error("❌ Failed to send data:", error.response ? error.response.data : error.message);
    }
};

// Run this function every 30 seconds
setInterval(sendDataToBackend, 30000);
