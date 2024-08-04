<template>
  <v-container>
    <v-card>
      <v-card-title>Games</v-card-title>
      <v-card-text>
        <v-btn @click="showAddGameForm" color="primary">Add Game</v-btn>
        <v-list>
          <v-list-item
            v-for="game in games"
            :key="game._id"
            @click="selectGame(game)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ game.date }} - {{ game.location }}</v-list-item-title>
              <v-list-item-subtitle>{{ game.time }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <AddGameForm v-if="isAddGameFormVisible" @save="fetchGames" @close="isAddGameFormVisible = false" />
        <EditGameForm
          v-if="isEditGameFormVisible"
          :selectedGame="selectedGame"
          @save="fetchGames"
          @close="closeEditForm"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import AddGameForm from './AddGameForm.vue';
import EditGameForm from './EditGameForm.vue';

export default {
  components: { AddGameForm, EditGameForm },
  setup() {
    const games = ref([]);
    const isAddGameFormVisible = ref(false);
    const isEditGameFormVisible = ref(false);
    const selectedGame = ref(null);

    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8000/games');
        games.value = response.data;
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    const showAddGameForm = () => {
      isAddGameFormVisible.value = true;
    };

    const selectGame = (game) => {
      console.log('Selected game:', game);
      selectedGame.value = game;
      isEditGameFormVisible.value = true;
    };

    const closeEditForm = () => {
      isEditGameFormVisible.value = false;
      selectedGame.value = null;
    };

    fetchGames();

    return {
      games,
      isAddGameFormVisible,
      isEditGameFormVisible,
      selectedGame,
      fetchGames,
      showAddGameForm,
      selectGame,
      closeEditForm,
    };
  },
};
</script>
