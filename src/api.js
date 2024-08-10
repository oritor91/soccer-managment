import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your actual backend URL

// Players API
export const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/players');
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

export const addPlayer = async (player) => {
    try {
      await axios.post('http://localhost:8000/player', player.value);
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

export const updatePlayer = async (requestData) => {
    try {
      const res = await axios.request({
        url: 'http://localhost:8000/player',
        method: 'put',
        data: requestData,
      });
      return res.data;
    } catch (error) {
      console.error('Error updating player:', error);
    }
};

export const deletePlayer = async (player) => {
  try {
    const response = await axios.delete(`${API_URL}/player`, { data: player });
    return response.data;
  } catch (error) {
    console.error('Error deleting player:', error);
    throw error;
  }
};

// Games API
export const fetchGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/games`);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const addGame = async (game) => {
    try {
      await axios.post('http://localhost:8000/game', game.value);
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

export const updateGame = async (game) => {
    try {
      await axios.request({
        url: 'http://localhost:8000/game',
        method: 'put',
        data: game.value
      });
    } catch (error) {
      console.error('Failed to update game:', error);
    }
  };

export const deleteGame = async (game) => {
    try {
      console.log(game.value)
      await axios.request({
        url: 'http://localhost:8000/game',
        method: 'delete',
        data: game.value
      });
    } catch (error) {
      console.error('Failed to delete game:', error);
    }
  };

export const sortPlayersIntoGroups = async (game) => {
    try {
      console.log("xxxxxxxxxxxxxxxx");
      const game_id = `${game.value.date}_${game.value.time}`;
      const response = await axios.post(`http://localhost:8000/game/${game_id}/sort-groups`);
      
      return response.data;
    } catch (error) {
      console.error('Failed to sort players into groups:', error);
    }
  };

export const saveSortedGroups = async (game, sortedGroups) => {
    try {
      const game_id = `${game.value.date}_${game.value.time}`;
      await axios.put(`http://localhost:8000/game/${game_id}/save-groups`, {
        sortedGroups: sortedGroups.value
      });
    } catch (error) {
      console.error('Failed to save sorted groups:', error);
    }
  };
