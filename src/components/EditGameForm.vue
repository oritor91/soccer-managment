<template>
  <v-container>
    <v-card class="my-4">
      <v-card-text>
        <v-form @submit.prevent="updateCurrentGame">
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
            v-model="selectedPlayers"
            label="Select Players"
            :items="players"
            item-title="name"
            item-value="name"
            multiple
            chips
            @update:modelValue="updateSelectedPlayers"
          ></v-select>
          <v-btn type="submit" color="primary">Update Game</v-btn>
          <v-btn type="button" color="error" @click="deleteCurrentGame">Delete Game</v-btn>
          <v-btn type="button" color="secondary" @click="closeForm">Cancel</v-btn>
          <v-btn type="button" color="success" @click="sortGroups">Sort into Groups</v-btn>
          <v-btn type="button" color="success" @click="saveGroups" v-if="sortedGroups">Save Groups</v-btn>
        </v-form>
        <v-row v-if="sortedGroups" class="mt-4">
          <v-col cols="12" md="4">
            <v-card outlined>
              <v-card-title>Group 1</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="player in sortedGroups.group_a" :key="player.name">
                    <v-list-item-title>{{ player.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ player.position }} - Skill Level: {{ player.skill_level }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card outlined>
              <v-card-title>Group 2</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="player in sortedGroups.group_b" :key="player.name">
                    <v-list-item-title>{{ player.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ player.position }} - Skill Level: {{ player.skill_level }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card outlined>
              <v-card-title>Group 3</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="player in sortedGroups.group_c" :key="player.name">
                    <v-list-item-title>{{ player.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ player.position }} - Skill Level: {{ player.skill_level }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    selectedGame: Object,
  },
  setup(props, { emit }) {
    const store = useStore(); // Access the Vuex store

    const game = ref({
      _id: '',
      date: '',
      time: '',
      location: '',
      players: [],
      sortedGroups: {},
    });

    const players = ref([]);
    const selectedPlayers = ref([]);
    const sortedGroups = ref(null);

    const loadPlayers = async () => {
      try {
        await store.dispatch('fetchPlayers');
        players.value = store.state.players;
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    const updateSelectedPlayers = (selectedNames) => {
      game.value.players = selectedNames.map(name =>
        players.value.find(player => player.name === name)
      );
    };

    const updateCurrentGame = async () => {
      try {
        await store.dispatch('updateGame', game.value);
        emit('save');
        closeForm();
      } catch (error) {
        console.error('Failed to update game:', error);
      }
    };

    const deleteCurrentGame = async () => {
      try {
        await store.dispatch('deleteGame', game.value);
        emit('save');
        closeForm();
      } catch (error) {
        console.error('Failed to delete game:', error);
      }
    };

    const sortGroups = async () => {
      try {
        const response = await store.dispatch('sortPlayersIntoGroups', game.value);
        sortedGroups.value = response;
        game.value.sortedGroups = response;
      } catch (error) {
        console.error('Failed to sort players into groups:', error);
      }
    };

    const saveGroups = async () => {
      try {
        await store.dispatch('saveSortedGroups', {
          game: game.value,
          sortedGroups: sortedGroups.value,
        });
        emit('save');
        closeForm();
      } catch (error) {
        console.error('Failed to save sorted groups:', error);
      }
    };

    const closeForm = () => {
      emit('close');
    };

    watch(() => props.selectedGame, (newGame) => {
      if (newGame) {
        game.value = { ...newGame };
        selectedPlayers.value = newGame.players ? newGame.players.map(player => player.name) : [];
        sortedGroups.value = newGame.sorted_groups || null;
      }
    }, { immediate: true });

    onMounted(() => {
      loadPlayers();
    });

    return {
      game,
      players,
      selectedPlayers,
      sortedGroups,
      updateCurrentGame,
      deleteCurrentGame,
      sortGroups,
      saveGroups,
      closeForm,
      updateSelectedPlayers,
    };
  },
};
</script>
