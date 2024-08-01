<template>
  <v-container>
    <v-card>
      <v-card-title>Edit Player</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updatePlayer">
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
          <v-text-field
            v-model="playerData.position"
            label="Position"
            required
          ></v-text-field>
          <v-text-field
            v-model="playerData.skill_level"
            label="Skill Level"
            type="number"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary">Update Player</v-btn>
          <v-btn type="button" color="secondary" @click="closeForm">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';

export default {
  props: ['player'],
  setup(props, { emit }) {
    const playerData = ref({ ...props.player });
    const oldPlayerData = ref({ ...props.player });

    watch(
      () => props.player,
      (newPlayer) => {
        playerData.value = { ...newPlayer };
        oldPlayerData.value = { ...newPlayer };
      }
    );

    const updatePlayer = async () => {
      try {
        const requestData = {
          old: oldPlayerData.value,
          new: playerData.value,
        };
        await axios.request({
          url: 'http://localhost:8000/player',
          method: 'put',
          data: requestData,
        });
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
      updatePlayer,
      closeForm,
    };
  },
};
</script>
