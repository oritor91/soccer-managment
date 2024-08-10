<template>
  <v-container>
    <v-card class="my-4">
      <v-card-title>
        <v-row align="center">
          <v-col>Players</v-col>
          <v-col class="text-right">
            <v-btn @click="isAddPlayerFormVisible = true" color="primary">
              <v-icon left>mdi-plus</v-icon> Add Player
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-dialog v-model="isAddPlayerFormVisible" max-width="500">
          <v-card>
            <v-card-title>Add Player</v-card-title>
            <v-card-text>
              <AddPlayerForm @save="loadPlayers" @cancel="isAddPlayerFormVisible = false" />
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-row>
          <v-col v-for="player in players" :key="player._id" cols="12" md="6">
            <v-card class="my-2" outlined>
              <v-card-title>
                <v-row>
                  <v-col>{{ player.name }}</v-col>
                  <v-col class="text-right">
                    <v-btn icon @click="editPlayer(player)" color="black">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="removePlayer(player)" color="error">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-subtitle>{{ player.position }} - Skill Level: {{ player.skill_level }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog v-model="isEditPlayerFormVisible" max-width="600">
          <v-card>
            <v-card-title>Edit Player</v-card-title>
            <v-card-text>
              <EditPlayerForm :player="currentPlayer" @save="loadPlayers" @close="closeEditForm" />
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
import AddPlayerForm from './AddPlayerForm.vue';
import EditPlayerForm from './EditPlayerForm.vue';

export default {
  components: { AddPlayerForm, EditPlayerForm },
  setup() {
    const isAddPlayerFormVisible = ref(false);
    const isEditPlayerFormVisible = ref(false);
    const currentPlayer = ref(null);

    const store = useStore(); // Access the Vuex store

    const players = computed(() => store.state.players); // Map state
    const fetchPlayers = () => store.dispatch('fetchPlayers'); // Map actions
    const deletePlayer = (player) => store.dispatch('deletePlayer', player);

    const loadPlayers = async () => {
      try {
        await fetchPlayers();
      } catch (error) {
        console.error('Error loading players:', error);
      }
    };

    const editPlayer = (player) => {
      currentPlayer.value = player;
      isEditPlayerFormVisible.value = true;
    };

    const removePlayer = async (player) => {
      try {
        await deletePlayer(player);
        await loadPlayers();
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    };

    const closeEditForm = () => {
      isEditPlayerFormVisible.value = false;
      loadPlayers();
    };

    onMounted(loadPlayers);

    return {
      players,
      isAddPlayerFormVisible,
      isEditPlayerFormVisible,
      currentPlayer,
      loadPlayers,
      editPlayer,
      removePlayer,
      closeEditForm,
    };
  },
};
</script>
