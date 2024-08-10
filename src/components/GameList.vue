<template>
  <v-container>
    <v-card class="my-4">
      <v-card-title>
        <v-row align="center">
          <v-col>Games</v-col>
          <v-col class="text-right">
            <v-btn @click="showAddGameForm" color="primary">
              <v-icon left>mdi-plus</v-icon> Add Game
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-dialog v-model="isAddGameFormVisible" max-width="600">
          <v-card>
            <v-card-title>Add Game</v-card-title>
            <v-card-text>
              <AddGameForm @save="loadGames" @close="isAddGameFormVisible = false" />
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-row>
          <v-col v-for="game in games" :key="game._id" cols="12" md="6">
            <v-card class="my-2" outlined>
              <v-card-title>
                <v-row>
                  <v-col>{{ game.date }} - {{ game.location }}</v-col>
                  <v-col class="text-right">
                    <v-btn icon @click="selectGame(game)" color="black">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-subtitle>{{ game.time }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog v-model="isEditGameFormVisible" max-width="1000">
          <v-card>
            <v-card-title>Edit Game</v-card-title>
            <v-card-text>
              <EditGameForm :selectedGame="selectedGame" @save="loadGames" @close="closeEditForm" />
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import AddGameForm from './AddGameForm.vue';
import EditGameForm from './EditGameForm.vue';

export default {
  components: { AddGameForm, EditGameForm },
  setup() {
    const store = useStore(); // Access the Vuex store

    const isAddGameFormVisible = ref(false);
    const isEditGameFormVisible = ref(false);
    const selectedGame = ref(null);

    const games = computed(() => store.state.games); // Map games state

    const loadGames = async () => {
      try {
        await store.dispatch('fetchGames'); // Fetch games using Vuex action
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    const showAddGameForm = () => {
      isAddGameFormVisible.value = true;
    };

    const selectGame = (game) => {
      selectedGame.value = game;
      isEditGameFormVisible.value = true;
    };

    const closeEditForm = () => {
      isEditGameFormVisible.value = false;
      selectedGame.value = null;
    };

    onMounted(() => {
      loadGames();
    });

    return {
      games,
      isAddGameFormVisible,
      isEditGameFormVisible,
      selectedGame,
      loadGames,
      showAddGameForm,
      selectGame,
      closeEditForm,
    };
  },
};
</script>
