import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your actual backend URL

const store = createStore({
  state: {
    players: [],
    games: [],
  },
  mutations: {
    setPlayers(state, players) {
      state.players = players;
    },
    addPlayer(state, player) {
      state.players.push(player);
    },
    updatePlayer(state, updatedPlayer) {
      console.log(updatedPlayer.id)
      const index = state.players.findIndex(player => player._id === updatedPlayer._id);
      if (index !== -1) {
        state.players.splice(index, 1, updatedPlayer);
      }
    },
    deletePlayer(state, playerId) {
      console.log(playerId);
      state.players = state.players.filter(player => player._id !== playerId);
    },
    setGames(state, games) {
      state.games = games;
    },
    addGame(state, game) {
      state.games.push(game);
    },
    updateGame(state, updatedGame) {
      const index = state.games.findIndex(game => game.id === updatedGame.id);
      if (index !== -1) {
        state.games.splice(index, 1, updatedGame);
      }
    },
    deleteGame(state, gameId) {
      state.games = state.games.filter(game => game.id !== gameId);
    },
    setSortedGroups(state, { gameId, sortedGroups }) {
      console.log("setSortedGroups");
      console.log(gameId, sortedGroups);
      console.log(state.games);
      const game = state.games.find(game => game.id === gameId);
      console.log("----------------");
      console.log(game);
      if (game) {
        game.sortedGroups = sortedGroups;
      }
    },
  },
  actions: {
    async fetchPlayers({ commit }) {
      try {
        console.log('Fetching players');
        const response = await axios.get(`${API_URL}/players`);
        commit('setPlayers', response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    },
    async addPlayer({ commit }, player) {
      try {
        const response = await axios.post(`${API_URL}/player`, player);
        commit('addPlayer', response.data);
      } catch (error) {
        console.error('Error adding player:', error);
      }
    },
    async updatePlayer({ commit }, player) {
      try {
        console.log(player);
        const res = await axios.request({
          url: `http://localhost:8000/player/${player._id}`,
          method: 'put',
          data: player,
        });
        commit('updatePlayer', res.data);
      } catch (error) {
        console.error('Error updating player:', error);
      }
    },
    async deletePlayer({ commit }, player) {
      try {
        console.log(player);
        await axios.delete(`${API_URL}/player/${player._id}`);
        commit('deletePlayer', player._id);
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    },
    async fetchGames({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/games`);
        commit('setGames', response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },
    async addGame({ commit }, game) {
      try {
        const response = await axios.post(`${API_URL}/game`, game);
        commit('addGame', response.data);
      } catch (error) {
        console.error('Error adding game:', error);
      }
    },
    async updateGame({ commit }, game) {
      try {
        const res = await axios.request({
          url: `http://localhost:8000/game/${game._id}`,
          method: 'put',
          data: game,
        });
        commit('updateGame', res.data);
      } catch (error) {
        console.error('Error updating player:', error);
      }
    },
    async deleteGame({ commit }, game) {
      try {
        await axios.delete(`${API_URL}/game/${game._id}`);
        commit('deleteGame', game._id);
      } catch (error) {
        console.error('Failed to delete game:', error);
      }
    },
    async sortPlayersIntoGroups({ commit }, game) {
      try {
        console.log("xxxxxxxxxxxxxxxx");
        const game_id = `${game.date}_${game.time}`;
        const response = await axios.post(`${API_URL}/game/${game_id}/sort-groups`);
        console.log("----------------");
        console.log(response.data);
        commit('setSortedGroups', { gameId: game_id, sortedGroups: response.data });
      } catch (error) {
        console.error('Failed to sort players into groups:', error);
      }
    },
    async saveSortedGroups({ commit }, { game, sortedGroups }) {
      try {
        const game_id = `${game.date}_${game.time}`;
        await axios.put(`${API_URL}/game/${game_id}/save-groups`, {
          sortedGroups,
        });
        commit('setSortedGroups', { gameId: game.id, sortedGroups });
      } catch (error) {
        console.error('Failed to save sorted groups:', error);
      }
    },
  },
  getters: {
    getPlayerById: (state) => (id) => {
      return state.players.find(player => player.id === id);
    },
    getGameById: (state) => (id) => {
      return state.games.find(game => game.id === id);
    },
  },
});


export default store;