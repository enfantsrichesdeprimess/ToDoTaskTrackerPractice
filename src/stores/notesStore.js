import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotesStore = defineStore('notes', () => {
    const columns = ref([
        {
            id: 1,
            maxCards: 3,
            cards: [
                {
                    id: 1,
                    cardTitle: 'План на сегодня',
                    points: [
                        { id: 1, title: 'Позавтракать', isReady: false },
                        { id: 2, title: 'Сделать зарядку', isReady: true },
                        { id: 3, title: 'Почитать книгу', isReady: false }
                    ]
                }
            ]
        },
        {
            id: 2,
            maxCards: 5,
            cards: [
                {
                    id: 2,
                    cardTitle: 'Список покупок',
                    points: [
                        { id: 4, title: 'Молоко', isReady: false },
                        { id: 5, title: 'Хлеб', isReady: true },
                        { id: 6, title: 'Яйца', isReady: false },
                        { id: 7, title: 'Сыр', isReady: false },
                        { id: 8, title: 'Помидоры', isReady: false }
                    ]
                }
            ]
        },
        {
            id: 3,
            maxCards: Infinity,
            cards: []
        }
    ])

    const togglePoint = (cardId, pointId) => {
        for (const column of columns.value) {
            const card = column.cards.find(c => c.id === cardId)
            if (card) {
                const point = card.points.find(p => p.id === pointId)
                if (point) {
                    point.isReady = !point.isReady
                    console.log(` Пункт ${pointId} в карточке ${cardId} теперь:`, point.isReady)
                    return
                }
            }
        }
    }

    const logStore = () => {
        console.log(' Состояние store:')
        columns.value.forEach(col => {
            console.log(`Колонка ${col.id}: ${col.cards.length}/${col.maxCards === Infinity ? '∞' : col.maxCards} карточек`)
        })
    }

    return { columns, togglePoint, logStore }
})