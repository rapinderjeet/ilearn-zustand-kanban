import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (uuid, title, state) => set((store) => ({
        tasks: [...store.tasks, { uuid, title, state }], // todo immer js
    })),
    deleteTask: (uuid) => set((store) => ({
        tasks: store.tasks.filter((task) => task.uuid !== uuid),
    })),
    setDraggedTask: (uuid) => set({ draggedTask: uuid }),
    moveTask: (uuid, state) => set((store) => ({
        tasks: store.tasks.map((task) => {
            if (task.uuid === uuid) {
                return { ...task, state };
            }
            return task;
        }),
    })),
})

export const useStore = create(persist(store), {
    name: 'kanban-storage',
});