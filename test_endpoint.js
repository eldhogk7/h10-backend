(async function test() {
    try {
        const res = await fetch('http://127.0.0.1:5001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'superadmin@example.com', password: 'password123' })
        });
        const loginData = await res.json();
        const token = loginData.data?.token || loginData.token || loginData.data?.access_token;
        console.log("Token length:", token?.length);
        const holdersRes = await fetch('http://127.0.0.1:5001/pod-holders', { headers: { Authorization: `Bearer ${token}` } });
        const holders = await holdersRes.json();
        console.log("Holders response keys:", Object.keys(holders));
        let arr = holders.data ? holders.data : holders;
        if (arr.length > 0) {
            console.log("First holder keys:", Object.keys(arr[0]));
            if (arr[0].pods) {
                console.log("First holder pods len:", arr[0].pods.length);
            }
        }
    } catch (err) { console.error(err); }
})();
