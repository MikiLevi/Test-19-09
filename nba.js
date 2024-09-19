"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const search = document.getElementById(`search-btn`);
const tbody = document.getElementById(`tbody`);
const BASE_URL = `https://nbaserver-q21u.onrender.com/api/filter/`;
function addPlayer() {
    return __awaiter(this, void 0, void 0, function* () {
        const newPlayer = {
            position: document.getElementById("select").value,
            twoPercent: Number(document.getElementById("point").value),
            threePercent: Number(document.getElementById("two").value),
            points: Number(document.getElementById("three").value),
        };
        try {
            const res = yield fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newPlayer)
            });
            const jsonResponse = yield res.json();
            console.log("Response from API:", jsonResponse);
            if (!res.ok) {
                throw new Error(`Error: ${jsonResponse.message || "Network error"}`);
            }
            console.log("Fantasy added", jsonResponse);
        }
        catch (error) {
            console.log("Error occurred:", error);
        }
    });
}
function renderPlayer() {
    return __awaiter(this, arguments, void 0, function* (filterPlayer = []) {
        tbody.textContent = "";
        filterPlayer.forEach(player => {
            const tr = document.createElement("tr");
            const nameTd = document.createElement("td");
            player.textContent = player.playerName;
            tr.append(nameTd);
            const positionTd = document.createElement("td");
            positionTd.textContent = player.position;
            tr.append(positionTd);
            const pointsTd = document.createElement("td");
            pointsTd.textContent = player.points.toString();
            tr.append(pointsTd);
            const twoPercentTd = document.createElement("td");
            twoPercentTd.textContent = player.twoPercent.toString();
            tr.append(twoPercentTd);
            const threePercentTd = document.createElement("td");
            threePercentTd.textContent = player.threePercent.toString();
            tr.append(threePercentTd);
            const actionsTd = document.createElement("td");
            const addPlayerBtn = document.createElement("button");
            addPlayerBtn.textContent = "Add Player";
            addPlayerBtn.onclick = () => {
                addPlayer();
            };
            actionsTd.append(addPlayerBtn);
            tr.append(actionsTd);
            t.append(tr);
        });
    });
}
addPlayer();
