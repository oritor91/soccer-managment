<template>
  <v-container>
    <v-card class="my-4">
      <v-card-title>Add Game</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addNewGame">
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
            label="location - optional"
            required
          ></v-text-field>
          <v-select
            v-model="selectedPlayerNames"
            label="Select Players"
            :items="players"
            item-title="name"
            item-value="name"
            multiple
            chips
            :filter="customFilter"
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
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup(props, { emit }) {
    const store = useStore(); // Access the Vuex store

    const game = ref({
      date: '',
      time: '',
      location: '',
      players: [], // This will store the full player objects
    });

    const players = computed(() => store.state.players); // Get players from Vuex store
    const selectedPlayerNames = ref([]);

    const loadPlayers = async () => {
      try {
        await store.dispatch('fetchPlayers'); // Fetch players using Vuex action
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    const updateSelectedPlayers = (selectedNames) => {
      game.value.players = selectedNames.map(name => 
        players.value.find(player => player.name === name)
      );
    };

    const addNewGame = async () => {
      try {
        await store.dispatch('addGame', game.value); // Add game using Vuex action
        emit('save');
        closeForm();
      } catch (error) {
        console.error('Error adding game:', error);
      }
    };

    const closeForm = () => {
      emit('close');
    };

    const customFilter = (item, queryText, itemText) => {
      const text = itemText.toLowerCase();
      const searchText = queryText.toLowerCase();
      return text.includes(searchText);
    };

    onMounted(() => {
      loadPlayers();
    });

    return {
      game,
      players,
      selectedPlayerNames,
      addNewGame,
      closeForm,
      updateSelectedPlayers,
      customFilter,
    };
  },
};
</script>

<style scoped>
.v-dialog .v-card {
  max-width: 100%;
  width: 600px;
}
</style>
