<template>
  <v-container>
    <v-card>
      <v-card-title>Players</v-card-title>
      <v-card-text>
        <v-btn @click="isAddPlayerFormVisible = true" color="primary">Add Player</v-btn>
        <v-list>
          <v-list-item v-for="player in players" :key="player.id">
            <v-list-item-content>
              <v-list-item-title>{{ player.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ player.position }} - Skill Level: {{ player.skill_level }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="editPlayer(player)" color="black">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="deletePlayer(player)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <AddPlayerForm v-if="isAddPlayerFormVisible" @save="fetchPlayers" @cancel="isAddPlayerFormVisible = false" />
        <EditPlayerForm v-if="isEditPlayerFormVisible" :player="currentPlayer" @save="fetchPlayers" @close="closeEditForm" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AddPlayerForm from './AddPlayerForm.vue';
import EditPlayerForm from './EditPlayerForm.vue';

export default {
  components: { AddPlayerForm, EditPlayerForm },
  setup() {
    const players = ref([]);
    const isAddPlayerFormVisible = ref(false);
    const isEditPlayerFormVisible = ref(false);
    const currentPlayer = ref(null);

    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/player');
        players.value = response.data;
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    const editPlayer = (player) => {
      currentPlayer.value = player;
      isEditPlayerFormVisible.value = true;
    };

    const deletePlayer = async (player) => {
      try {
        await axios.request({
          url: 'http://localhost:8000/player',
          method: 'delete',
          data: player
        });
        fetchPlayers();
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    };

    const closeEditForm = () => {
      isEditPlayerFormVisible.value = false;
    };

    onMounted(fetchPlayers);

    return {
      players,
      isAddPlayerFormVisible,
      isEditPlayerFormVisible,
      currentPlayer,
      fetchPlayers,
      editPlayer,
      deletePlayer,
      closeEditForm,
    };
  },
};
</script>
