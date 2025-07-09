// src/stores/logStore.js
import { defineStore } from "pinia";
import api from "@/utils/axios";
import { useAuthStore } from "./authStore";

export const useLogStore = defineStore("logStore", {
  state: () => ({
    logs: [],
  }),

  actions: {
    async fetchLogs() {
      const auth = useAuthStore();

      if (!auth.user || !auth.user.id) {
        console.warn("User belum login. Tidak fetch log.");
        return;
      }

      const res = await api.get(`/logs?userId=${auth.user.id}`);
      this.logs = res.data;
    },

    async addLog({ habitId, date }) {
      const auth = useAuthStore();
      const newLog = {
        userId: auth.user.id,
        habitId,
        date,
        completed: true,
      };
      const res = await api.post('/logs', newLog);
      await this.fetchLogs(); // Pastikan data up-to-date
      return res.data;
    },

    async removeLog(id) {
      await api.delete(`/logs/${id}`);
      await this.fetchLogs(); // Refresh list log
    },

    async toggleLog(habitId, date) {
      const auth = useAuthStore();
      const existing = this.logs.find(
        (log) => log.habitId === habitId && log.date === date && log.userId === auth.user.id
      );

      if (existing) {
        await this.removeLog(existing.id);
      } else {
        await this.addLog({ habitId, date });
      }
    },

    getStreak() {
      const auth = useAuthStore();
      const today = new Date();
      let streak = 0;

      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateStr = checkDate.toISOString().slice(0, 10);

        const logsToday = this.logs.filter(
          (log) =>
            log.date === dateStr &&
            log.userId === auth.user.id
        );

        if (logsToday.length > 0) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    }
  },

  getters: {
    getLogsByDate: (state) => {
      const result = {};
      state.logs.forEach((log) => {
        if (!result[log.date]) {
          result[log.date] = 1;
        } else {
          result[log.date]++;
        }
      });
      return result;
    },
  },
});
