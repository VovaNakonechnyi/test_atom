import { defineStore } from 'pinia';
import api from 'src/api';
import { State } from 'src/interfaces/stores/lessons';

const { lessons } = api;

export const useLessonsStore = defineStore('lessons', {
  state: (): State => ({
    lessons: [
      {
        id: 0,
        title: '',
        subtitle: '',
        video_url: '',
        video_time: 0,
        description: '',
        unlock: false,
        videoId: '',
      },
    ],
  }),

  actions: {
    async fetchLessons(): Promise<void> {
      this.lessons = await lessons.apiLessons();
    },
  },
});
