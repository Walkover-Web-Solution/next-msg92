function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

/**
 * Deletes a cookie by name
 * @param {string} name - The name of the cookie to delete
 */
function deleteCookie(name) {
    setCookie(name, '', -1);
}

// Example usage:
// setCookie('test_cookie', 'test_value', 7); // Set cookie for 7 days
// console.log(getCookie('test_cookie')); // Get cookie value
// deleteCookie('test_cookie'); // Delete cookie
