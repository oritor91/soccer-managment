<template>
  <v-container>
    <v-card>
      <v-card-title>Add Game</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addGame">
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
          <v-btn type="submit" color="primary">Add Game</v-btn>
          <v-btn type="button" color="secondary" @click="closeForm">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup(props, { emit }) {
    const game = ref({
      date: '',
      time: '',
      location: '',
      players: [], // This will store the full player objects
    });

    const players = ref([]);

    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/player');
        players.value = response.data;
        console.log('Fetched players:', players.value);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    const updateSelectedPlayers = (selectedNames) => {
      // Map selected names back to full player objects
      game.value.players = selectedNames.map(name => 
        players.value.find(player => player.name === name)
      );
    };

    const addGame = async () => {
      try {
        console.log(game.value)
        await axios.post('http://localhost:8000/game', game.value);
        emit('save');
        closeForm();
      } catch (error) {
        console.error('Error adding game:', error);
      }
    };

    const closeForm = () => {
      emit('close');
    };

    onMounted(fetchPlayers);

    return {
      game,
      players,
      addGame,
      closeForm,
      updateSelectedPlayers,
    };
  },
};
</script>
