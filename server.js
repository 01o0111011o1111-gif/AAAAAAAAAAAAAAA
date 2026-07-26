const express = require('express');
const app = express();
app.use(express.json());

let infectedGames = [];

app.post('/report', (req, res) => {
    const gameName = req.body.gameName || "Unknown Game";
    const placeId = req.body.placeId || 0;
    const time = new Date().toLocaleTimeString();

    const exists = infectedGames.find(g => g.placeId === placeId);
    if (!exists) {
        infectedGames.push({ gameName, placeId, time });
    }
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    let html = `<html><head><title>Panel</title><style>body{background:#121212;color:#00ffaa;font-family:Arial;padding:20px;}.card{background:#1e1e1e;padding:15px;margin:10px 0;border-radius:8px;}</style></head><body><h1>🎯 Игры со скриптом</h1>`;
    if (infectedGames.length === 0) {
        html += `<p>Пока тихо...</p>`;
    } else {
        infectedGames.forEach(g => {
            html += `<div class="card"><h3>🎮 ${g.gameName}</h3><p>Place ID: ${g.placeId}</p><p>Время: ${g.time}</p></div>`;
        });
    }
    html += `</body></html>`;
    res.send(html);
});

app.listen(process.env.PORT || 3000);
