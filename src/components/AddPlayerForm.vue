<template>
  <v-container>
    <v-card>
      <v-card-title>Add Player</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addNewPlayer">
          <v-text-field
            v-model="player.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="player.phone_number"
            label="Phone Number"
            required
          ></v-text-field>
          <v-select
            v-model="player.position"
            :items="positions"
            label="Position"
            required
          ></v-select>
          <v-select
            v-model="player.skill_level"
            :items="skillLevels"
            label="Skill Level"
            required
          ></v-select>
          <v-btn type="submit" color="primary">Add Player</v-btn>
          <v-btn type="button" color="secondary" @click="cancelForm">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { addPlayer } from '@/api';
import { PLAYER_POSITIONS, PLAYER_SKILL_LEVEL } from '@/consts';


export default {
  setup(props, { emit }) {
    const player = ref({
      name: '',
      phone_number: '',
      position: '',
      skill_level: 0,
    });

    const positions = ref(PLAYER_POSITIONS);
    const skillLevels = ref(PLAYER_SKILL_LEVEL);

    const addNewPlayer = async () => {
      try {
        await addPlayer(player);
        resetForm();
      } catch (error) {
        console.error('Error adding player:', error);
      }
    };

    const resetForm = () => {
      player.value = {
        name: '',
        phone_number: '',
        position: '',
        skill_level: 0,
      };
      emit("cancel");
    };

    const cancelForm = () => {
      resetForm();
      emit('cancel');
    };

    return {
      player,
      addNewPlayer,
      resetForm,
      positions,
      skillLevels,
      cancelForm,
    };
  },
};
</script>
