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
        <v-dialog v-model="isAddPlayerFormVisible" max-width="600px">
          <v-card>
            <v-card-title>Add Player</v-card-title>
            <v-card-text>
              <AddPlayerForm @save="loadPlayers" @cancel="isAddPlayerFormVisible = false" @close="closeEditForm" />
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-row>
          <v-col v-for="player in players" :key="player.id" cols="12" md="6">
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

        <v-dialog v-model="isEditPlayerFormVisible" max-width="600px">
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
import { ref, onMounted } from 'vue';
import { fetchPlayers, deletePlayer } from '@/api';
import AddPlayerForm from './AddPlayerForm.vue';
import EditPlayerForm from './EditPlayerForm.vue';

export default {
  components: { AddPlayerForm, EditPlayerForm },
  setup() {
    const players = ref([]);
    const isAddPlayerFormVisible = ref(false);
    const isEditPlayerFormVisible = ref(false);
    const currentPlayer = ref(null);

    const loadPlayers = async () => {
      try {
        players.value = await fetchPlayers();
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