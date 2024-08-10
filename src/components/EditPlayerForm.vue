<template>
  <v-container>
    <v-card>
      <v-card-title>Edit Player</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateCurrentPlayer">
          <v-text-field
            v-model="playerData.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="playerData.phone_number"
            label="Phone Number"
            required
          ></v-text-field>
          <v-select
            v-model="playerData.position"
            :items="positions"
            label="Position"
            required
          ></v-select>
          <v-select
            v-model="playerData.skill_level"
            :items="skillLevels"
            label="Skill Level"
            required
          ></v-select>
          <v-btn type="submit" color="primary">Update Player</v-btn>
          <v-btn type="button" color="secondary" @click="closeForm">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { PLAYER_POSITIONS, PLAYER_SKILL_LEVEL } from '@/consts';

export default {
  props: ['player'],
  setup(props, { emit }) {
    const store = useStore(); // Access the Vuex store
    const playerData = ref({ ...props.player });
    const positions = ref(PLAYER_POSITIONS);
    const skillLevels = ref(PLAYER_SKILL_LEVEL);

    watch(
      () => props.player,
      (newPlayer) => {
        playerData.value = { ...newPlayer };
      }
    );

    const updateCurrentPlayer = async () => {
      try {
        await store.dispatch('updatePlayer', playerData.value); // Use Vuex action
        emit('save');
        closeForm();
      } catch (error) {
        console.error('Error updating player:', error);
      }
    };

    const closeForm = () => {
      emit('close');
    };

    return {
      playerData,
      updateCurrentPlayer,
      positions,
      skillLevels,
      closeForm,
    };
  },
};
</script>
