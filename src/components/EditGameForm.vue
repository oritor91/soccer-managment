<template>
  <v-container>
    <v-card>
      <v-card-title>Edit Game</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateGame">
          <v-text-field
            v-model="game.date"
            label="Date"
            type="date"
            required
          ></v-text-field>
          <v-text-field
            v-model="game.time"
            label="Time"
            type="time"
            required
          ></v-text-field>
          <v-text-field
            v-model="game.location"
            label="Location"
            required
          ></v-text-field>
          <v-select
            label="Select Players"
            :items="players"
            item-title="name"
            item-value="name"
            multiple
            @update:modelValue="updateSelectedPlayers"
          ></v-select>
          <v-btn type="submit" color="primary">Update Game</v-btn>
          <v-btn type="button" color="error" @click="deleteGame">Delete Game</v-btn>
          <v-btn type="button" color="secondary" @click="closeForm">Cancel</v-btn>
          <v-btn type="button" color="success" @click="sortPlayersIntoGroups">Sort into Groups</v-btn>
        </v-form>
        <div v-if="sortedGroups">
          <h3>Group 1</h3>
          <ul>
            <li v-for="player in sortedGroups.group_a" :key="player.name">{{ player.name }} - {{ player.skill_level }}</li>
          </ul>
          <h3>Group 2</h3>
          <ul>
            <li v-for="player in sortedGroups.group_b" :key="player.name">{{ player.name }} - {{ player.skill_level }}</li>
          </ul>
          <h3>Group 3</h3>
          <ul>
            <li v-for="player in sortedGroups.group_c" :key="player.name">{{ player.name }} - {{ player.skill_level }}</li>
          </ul>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: {
    selectedGame: Object,
  },
  setup(props, { emit }) {
    const game = ref({
      _id: '',
      date: '',
      time: '',
      location: '',
      players: [],
    });

    const players = ref([]);
    const selectedPlayers = ref([]);
    const sortedGroups = ref(null);

    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/players');
        players.value = response.data;
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    const updateSelectedPlayers = (selectedNames) => {
      game.value.players = selectedNames.map(name =>
        players.value.find(player => player.name === name)
      );
    };

    const updateGame = async () => {
      try {
        console.log(game.value);
        await axios.request({
          url: 'http://localhost:8000/game',
          method: 'put',
          data: game.value
        });
        emit('save');
        closeForm();
      } catch (error) {
        console.error('Failed to update game:', error);
      }
    };

    const deleteGame = async () => {
      try {
        await axios.request({
          url: 'http://localhost:8000/game',
          method: 'delete',
          data: props.selectedGame
        });
        emit('save');
        closeForm();
      } catch (error) {
        console.error('Failed to delete game:', error);
      }
    };

    const sortPlayersIntoGroups = async () => {
      try {
        const game_id = `${props.selectedGame.date}_${props.selectedGame.time}`;
        const response = await axios.post(`http://localhost:8000/games/${game_id}/sort-groups`);
        sortedGroups.value = response.data;
        console.log(sortedGroups.value.group_a);
      } catch (error) {
        console.error('Failed to sort players into groups:', error);
      }
    };

    const closeForm = () => {
      emit('close');
    };

    // Watch for changes in selectedGame prop and update local game state
    watch(() => props.selectedGame, (newGame) => {
      if (newGame) {
        console.log("Props updated:", newGame); // Debugging: Ensure this is logged
        game.value = { ...newGame };
        selectedPlayers.value = newGame.players ? newGame.players.map(player => player.name) : [];
      }
    }, { immediate: true });

    onMounted(() => {
      fetchPlayers();
    });

    return {
      game,
      players,
      selectedPlayers,
      sortedGroups,
      updateGame,
      deleteGame,
      sortPlayersIntoGroups,
      closeForm,
      updateSelectedPlayers,
    };
  },
};
</script>
