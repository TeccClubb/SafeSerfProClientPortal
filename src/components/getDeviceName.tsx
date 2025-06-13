    function getDeviceName(): string {
    const ua = navigator.userAgent;
    console.log("User Agent:", ua);
    if (/windows phone/i.test(ua)) return "Windows Phone";
    if (/android/i.test(ua)) return "Android Device";
    if (/iPad|iPhone|iPod/.test(ua)) return "iOS Device";
    if (/Macintosh/.test(ua)) return "Mac";
    if (/Windows/.test(ua)) return "Windows";
    if (/Linux/.test(ua)) return "Linux";

    return ua; // Default fallback
    }   
    export default getDeviceName;