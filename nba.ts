const search = document.getElementById(`search-btn`)
const tbody = document.getElementById(`tbody`)

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

async function renderPlayer(filterPlayer: Players[] = []): Promise<void>{
    tbody.textContent = "";
    filterPlayer.forEach(player =>{
        const tr = document.createElement("tr");

        const nameTd = document.createElement("td");
        player.textContent = player.playerName;
        tr.append(nameTd);

        const positionTd = document.createElement("td");
        positionTd.textContent = player.position;
        tr.append(positionTd);

        const pointsTd = document.createElement("td");
        pointsTd.textContent =player.points.toString();
        tr.append(pointsTd);

        const twoPercentTd = document.createElement("td");
        twoPercentTd.textContent =player.twoPercent.toString();
        tr.append(twoPercentTd);

        const threePercentTd = document.createElement("td");
        threePercentTd.textContent =player.threePercent.toString();
        tr.append(threePercentTd);

        const actionsTd = document.createElement("td");
        const addPlayerBtn = document.createElement("button");
        addPlayerBtn.textContent = "Add Player";
        addPlayerBtn.onclick = () =>{
            addPlayer()
        };
        actionsTd.append(addPlayerBtn)
        tr.append(actionsTd)
        t.append(tr);
    })
}
addPlayer()