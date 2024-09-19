const search = document.getElementById(`search-btn`)
const tbody = document.getElementById(`body`)
interface Players {
    position: string;
    twoPercent: Number;
    threePercent: Number;
    points: Number;
    playerName?: String;
}

const BASE_URL: string = `https://nbaserver-q21u.onrender.com/api/filter/`

async function addPlayer(): Promise<void> {
    const newPlayer: Players = {
        position: (document.getElementById("select") as HTMLSelectElement).value,
        twoPercent: Number((document.getElementById("point") as HTMLInputElement).value),
        threePercent: Number((document.getElementById("two") as HTMLInputElement).value),
        points: Number((document.getElementById("three") as HTMLInputElement).value),
    }
    try {
        const res = await fetch(BASE_URL, {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newPlayer)
        });
        const jsonResponse = await res.json();
        console.log("Response from API:", jsonResponse);
        if (!res.ok) {
            throw new Error(`Error: ${jsonResponse.message || "Network error"}`);
        }
        console.log("Fantasy added", jsonResponse);
    } catch (error) {
        console.log("Error occurred:", error);
    }
}
addPlayer()