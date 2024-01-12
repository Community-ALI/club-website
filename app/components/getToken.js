// a file that will be used to get the token from the local storage

function getToken() {
    // get the token from local storage
    const token = localStorage.getItem("token");
    const expireTime = localStorage.getItem("expireTime");
    // if the token is expired, remove it from local storage
    if (expireTime && Date.now() > expireTime) {
        console.log("Token Expired");
        localStorage.removeItem("token");
        localStorage.removeItem("expireTime");
        return null;
    }
    return token;
}

function setToken(data) {
    if (!data) { // if the data is null, remove the token from local storage
        console.log("Removing token");
        localStorage.removeItem("token");
        localStorage.removeItem("expireTime");
        return;
    }
    const token = data.token;
    const expireTime = data.expireTime;
    
    if (token && expireTime) {
        console.log("Setting token");
        localStorage.setItem("token", token);
        localStorage.setItem("expireTime", expireTime);
    } else {
        console.log("Removing token");
        localStorage.removeItem("token");
        localStorage.removeItem("expireTime");
    }
}

export { getToken, setToken };