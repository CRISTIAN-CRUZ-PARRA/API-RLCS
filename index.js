const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 8080;

server.use(middlewares);

// Endpoint personalizado para buscar jugadores por múltiples campos
server.get('/players/search', (req, res) => {
  const { name, epicAccountId, country } = req.query;
  const db = router.db; // lowdb instance
  let players = db.get('players').value();

  if (name) {
    players = players.filter(player => player.GamerTag.toLowerCase().includes(name.toLowerCase()));
  }
  if (epicAccountId) {
    players = players.filter(player =>
      player.ConnectedAccounts?.epicGamesAccount?.epicAccountId === epicAccountId
    );
  }
  if (country) {
    players = players.filter(player =>
      player.Country && player.Country.toLowerCase() === country.toLowerCase()
    );
  }

  res.json(players);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});