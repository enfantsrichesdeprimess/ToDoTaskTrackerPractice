import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
    const columns = ref([
        { id: 1, cards: [
                {
                    id: 1,
                    cardTitle: 'Note',
                    points: [
                        {
                            id: 1,
                            title: 'note point',
                            isReady: true,
                        },
                        {
                            id: 2,
                            title: 'note point',
                            isReady: false,
                        },
                    ],
                    cardReady: false,
                }
            ] },
        { id: 2, cards: [] },
        { id: 3, cards: [] }
    ])

    return { columns }
})