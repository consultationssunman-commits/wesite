let currentMode = 'member'; // Default view mode

// Switch between Member and Admin Form Tabs
function switchTab(mode) {
    currentMode = mode;
    document.getElementById('authError').innerText = '';
    document.getElementById('authForm').reset();
    
    if (mode === 'admin') {
        document.getElementById('tabAdmin').classList.add('active');
        document.getElementById('tabMember').classList.remove('active');
        document.getElementById('adminCodeGroup').classList.remove('hidden');
        document.getElementById('authCode').required = true;
    } else {
        document.getElementById('tabMember').classList.add('active');
        document.getElementById('tabAdmin').classList.remove('active');
        document.getElementById('adminCodeGroup').classList.add('hidden');
        document.getElementById('authCode').required = false;
    }
}

// Authentication Controller
function handleAuth(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('authName').value.trim();
    const phoneInput = document.getElementById('authPhone').value.trim();
    const codeInput = document.getElementById('authCode').value.trim();
    const errorDisplay = document.getElementById('authError');

    if (currentMode === 'admin') {
        // Strict verification for Admin Account
        if (nameInput === 'SSSanstha@45' && codeInput === '459077' && phoneInput.length >= 10) {
            loginSuccessful('SSSanstha Dashboard', 'ADMIN-01', true);
        } else {
            errorDisplay.innerText = "Invalid Admin Credentials! Check Code or Name.";
        }
    } else {
        // Member Access Logic (Generates a Member ID based on phone if new)
        let generatedId = "#" + phoneInput.substring(phoneInput.length - 6);
        loginSuccessful(nameInput, generatedId, false);
    }
}

function loginSuccessful(name, id, isAdmin) {
    document.getElementById('authContainer').classList.add('hidden');
    document.getElementById('dashboardContainer').classList.remove('hidden');
    
    // Fill the data parameters inside portal view
    document.getElementById('portalName').innerText = name;
    document.getElementById('portalId').innerText = id;
    
    if (isAdmin) {
        document.getElementById('adminBadge').classList.remove('hidden');
    } else {
        document.getElementById('adminBadge').classList.add('hidden');
    }
}

function logout() {
    document.getElementById('dashboardContainer').classList.add('hidden');
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('authForm').reset();
    switchTab('member');
}
