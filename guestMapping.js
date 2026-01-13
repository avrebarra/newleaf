// Session time mapping
const sessionTimes = {
    '1': '10.00 - 11.30 WIB',
    '2': '11.30 - 12.30 WIB',
    'default': '10.00 - 11.30 WIB'
};

// Function to encode guest data to base64 JSON
function encodeGuestData(name, session, akad = false) {
    const data = { name, session, akad };
    return btoa(JSON.stringify(data));
}

// Function to decode guest data from base64 JSON
function decodeGuestData(code) {
    try {
        const decoded = atob(code);
        return JSON.parse(decoded);
    } catch (e) {
        return null;
    }
}

// Function to get guest info from URL query parameter
function getGuestInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    let guestName = 'Friends & Family';
    let session = 'default';
    let showAkad = false;

    if (code) {
        const data = decodeGuestData(code);
        if (data && data.name) {
            guestName = data.name;
            session = data.session || 'default';
            showAkad = data.akad === true; // Default to false if not specified
        }
    }

    // Get session time
    const sessionTime = sessionTimes[session] || sessionTimes['default'];

    return {
        name: guestName,
        time: sessionTime,
        akad: showAkad
    };
}

// Function to apply guest info to the page
function applyGuestInfo() {
    const guestInfo = getGuestInfo();

    // Update the name in hero section
    const guestNameElement = document.querySelector('.hero-title');
    if (guestNameElement) {
        guestNameElement.textContent = guestInfo.name;
    }

    // Update the time in event section (resepsi time only)
    const eventTimeElement = document.querySelector('.event-time');
    if (eventTimeElement) {
        eventTimeElement.textContent = guestInfo.time;
    }

    // Show/hide akad section based on akad flag
    const akadTimeElement = document.querySelector('.event-time-akad');
    const eventTitle = document.querySelector('.event-title');

    if (!guestInfo.akad) {
        // Hide akad time
        if (akadTimeElement) {
            akadTimeElement.style.display = 'none';
        }
        // Update title to only show Resepsi
        if (eventTitle) {
            eventTitle.innerHTML = 'Resepsi<br>Pernikahan';
        }
    } else {
        // Show akad time
        if (akadTimeElement) {
            akadTimeElement.style.display = '';
        }
        // Keep title as Akad & Resepsi
        if (eventTitle) {
            eventTitle.innerHTML = 'Akad & Resepsi<br>Pernikahan';
        }
    }
}

// Code builder functionality
function showCodeBuilder() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || '';
    const session = urlParams.get('session') || '2';
    const akad = urlParams.get('akad') === 'true';

    const code = encodeGuestData(decodeURIComponent(name), session, akad);
    const fullUrl = `${window.location.origin}${window.location.pathname}?code=${code}`;

    // Hide invitation content
    document.body.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8f6f3; padding: 20px; font-family: 'Raleway', sans-serif;">
            <div style="max-width: 800px; width: 100%; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 40px;">
                <h1 style="font-family: 'Cormorant', serif; font-size: 2.5rem; color: #8b7355; margin-bottom: 30px; text-align: center;">Invitation Code Builder</h1>
                
                <div style="margin-bottom: 30px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #4a4a4a;">Guest Name:</label>
                    <input type="text" id="guestName" value="${name}" placeholder="Enter guest name" 
                        style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 4px; font-size: 1rem;" 
                        oninput="updateCode()" />
                </div>

                <div style="margin-bottom: 30px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #4a4a4a;">Session:</label>
                    <select id="sessionSelect" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 4px; font-size: 1rem;" 
                        onchange="updateCode()">
                        <option value="1" ${session === '1' ? 'selected' : ''}>Session 1 (10.00 - 11.30 WIB)</option>
                        <option value="2" ${session === '2' ? 'selected' : ''}>Session 2 (11.30 - 12.30 WIB)</option>
                    </select>
                </div>

                <div style="margin-bottom: 30px;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" id="akadCheckbox" ${akad ? 'checked' : ''} 
                            style="width: 20px; height: 20px; margin-right: 10px; cursor: pointer;" 
                            onchange="updateCode()" />
                        <span style="font-weight: 600; color: #4a4a4a;">Include Akad Nikah</span>
                    </label>
                    <p style="margin: 8px 0 0 30px; font-size: 0.9rem; color: #666;">If checked, invitation will show Akad time (08.00 - 09.00 WIB)</p>
                </div>

                <div style="background: #f5f5f5; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #4a4a4a;">Generated Code:</label>
                    <code id="generatedCode" style="display: block; padding: 15px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; word-break: break-all; font-family: monospace; font-size: 0.9rem;">${code}</code>
                    <button onclick="copyCode()" 
                        style="margin-top: 10px; padding: 10px 20px; background: #4a4a4a; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Copy Code
                    </button>
                </div>

                <div style="background: #f5f5f5; padding: 20px; border-radius: 4px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #4a4a4a;">Full URL:</label>
                    <code id="generatedUrl" style="display: block; padding: 15px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; word-break: break-all; font-family: monospace; font-size: 0.9rem;">${fullUrl}</code>
                    <button onclick="copyUrl()" 
                        style="margin-top: 10px; padding: 10px 20px; background: #4a4a4a; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Copy URL
                    </button>
                </div>

                <div style="margin-top: 30px; padding: 20px; background: #e8f4f8; border-radius: 4px; border-left: 4px solid #3498db;">
                    <h3 style="margin-top: 0; color: #2c3e50; font-size: 1.1rem;">Bulk Generation (Console)</h3>
                    <p style="margin: 10px 0; color: #555; font-size: 0.9rem;">Use this function in the browser console for bulk code generation:</p>
                    
                    <p style="margin: 15px 0 5px 0; color: #2c3e50; font-weight: 600; font-size: 0.95rem;">Method 1: From Array</p>
                    <pre style="background: white; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 0.85rem; margin-bottom: 15px;"><code>const guests = [
  {name: "Ahmad Sopian", session: "1", akad: false},
  {name: "Siti Nurhaliza", session: "2", akad: true},
  {name: "Budi Santoso", session: "1", akad: false}
];

const output = guests.map(g => {
  const result = generateBulkCode(g.name, g.session, g.akad);
  return \`\${result.name} → \${result.url}\`;
}).join('\\n');

console.log(output);</code></pre>

                    <p style="margin: 15px 0 5px 0; color: #2c3e50; font-weight: 600; font-size: 0.95rem;">Method 2: From Text (Easy Copy-Paste)</p>
                    <pre style="background: white; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 0.85rem;"><code>// Format: name#session#akad (one per line)
const text = \`
Ahmad Sopian#1#false
Siti Nurhaliza#2#true
Budi Santoso#1#false
\`;

console.log(generateBulkFromText(text));</code></pre>
                </div>
            </div>
        </div>
    `;

    // Add helper functions to window for the builder UI
    window.updateCode = function () {
        const name = document.getElementById('guestName').value;
        const session = document.getElementById('sessionSelect').value;
        const akad = document.getElementById('akadCheckbox').checked;
        const code = encodeGuestData(name, session, akad);
        const fullUrl = `${window.location.origin}${window.location.pathname}?code=${code}`;

        document.getElementById('generatedCode').textContent = code;
        document.getElementById('generatedUrl').textContent = fullUrl;
    };

    window.copyCode = function () {
        const code = document.getElementById('generatedCode').textContent;
        navigator.clipboard.writeText(code).then(() => {
        });
    };

    window.copyUrl = function () {
        const url = document.getElementById('generatedUrl').textContent;
        navigator.clipboard.writeText(url).then(() => {
        });
    };
}

// Bulk code generation function (accessible via console)
function generateBulkCode(name, session = '1', akad = false) {
    const code = encodeGuestData(name, session, akad);
    const baseUrl = window.location.origin + window.location.pathname;
    const fullUrl = `${baseUrl}?code=${code}`;
    return {
        name: name,
        session: session,
        akad: akad,
        code: code,
        url: fullUrl
    };
}

// Parse and generate bulk codes from simple format
// Format: name#session#akad (one per line)
// Example: Ahmad Sopian#1#true
function generateBulkFromText(text) {
    const lines = text.trim().split('\n');
    const results = [];

    lines.forEach(line => {
        const parts = line.trim().split('#');
        if (parts.length >= 2) {
            const name = parts[0].trim();
            const session = parts[1].trim() || '1';
            const akad = parts[2] ? parts[2].trim().toLowerCase() === 'true' : false;

            const result = generateBulkCode(name, session, akad);
            results.push(`${result.name} → ${result.url}`);
        }
    });

    return results.join('\n');
}

// Make functions globally accessible for console use
window.encodeGuestData = encodeGuestData;
window.decodeGuestData = decodeGuestData;
window.generateBulkCode = generateBulkCode;
window.generateBulkFromText = generateBulkFromText;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Check if we're in builder mode
    if (urlParams.get('build') === 'true') {
        showCodeBuilder();
    } else {
        applyGuestInfo();
    }
});
