import { createRouter, createWebHistory } from 'vue-router';
import PlayerList from '../components/PlayerList.vue';
import GameList from '../components/GameList.vue';

const routes = [
  {
    path: '/',
    name: 'PlayerList',
    component: PlayerList,
  },
  {
    path: '/games',
    name: 'GameList',
    component: GameList,
  },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
