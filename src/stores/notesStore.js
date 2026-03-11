import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'notes-app-data'

export const useNotesStore = defineStore('notes', () => {
    const loadInitialData = () => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch (e) {
                console.error('Ошибка загрузки данных:', e)
            }
        }

        return [
            {
                id: 1,
                maxCards: 3,
                cards: [
                    {
                        id: 1,
                        cardTitle: 'План на сегодня',
                        points: [
                            { id: 1, title: 'сделать практику уже наконец то', isReady: false },
                            { id: 2, title: 'сделать практику еще раз', isReady: true },
                            { id: 3, title: 'поиграть в доту на бруде вместо практики', isReady: false },
                            { id: 4, title: 'или в дедлок может быть', isReady: false }
                        ],
                        completedAt: null,
                        createdAt: '2026-03-01T10:00:00.000Z'
                    },
                    {
                        id: 2,
                        cardTitle: 'Спортивные цели',
                        points: [
                            { id: 5, title: 'Пробежка 5 км', isReady: true },
                            { id: 6, title: 'Отжимания 50 раз', isReady: false },
                            { id: 7, title: 'Растяжка 15 мин', isReady: false },
                        ],
                        completedAt: null,
                        createdAt: '2026-03-05T10:00:00.000Z'
                    },
                    {
                        id: 3,
                        cardTitle: 'Чтение',
                        points: [
                            { id: 8, title: 'Прочитать 20 страниц', isReady: false },
                            { id: 9, title: 'Выписать цитаты', isReady: false },
                            { id: 10, title: 'Написать конспект', isReady: false }
                        ],
                        completedAt: null,
                        createdAt: '2026-03-02T10:00:00.000Z'
                    }
                ]
            },
            {
                id: 2,
                maxCards: 5,
                cards: [
                    {
                        id: 4,
                        cardTitle: 'Список покупок',
                        points: [
                            { id: 11, title: 'Молоко', isReady: false },
                            { id: 12, title: 'Хлеб', isReady: true },
                            { id: 13, title: 'Яйца', isReady: false },
                            { id: 14, title: 'Сыр', isReady: false },
                            { id: 15, title: 'Помидоры', isReady: false }
                        ],
                        completedAt: null,
                        createdAt: '2026-03-01T10:00:00.000Z'
                    },
                    {
                        id: 5,
                        cardTitle: 'Рабочие задачи',
                        points: [
                            { id: 16, title: 'Ответить на письма', isReady: true },
                            { id: 17, title: 'Созвон с клиентом', isReady: true },
                            { id: 18, title: 'Написать отчет', isReady: false },
                            { id: 19, title: 'План на неделю', isReady: false },
                            { id: 20, title: 'Обновить документацию', isReady: false }
                        ],
                        completedAt: null,
                        createdAt: '2026-03-03T10:00:00.000Z'
                    },
                    {
                        id: 6,
                        cardTitle: 'Домашние дела',
                        points: [
                            { id: 21, title: 'Помыть посуду', isReady: true },
                            { id: 22, title: 'Пропылесосить', isReady: false },
                            { id: 23, title: 'Полить цветы', isReady: true },
                            { id: 24, title: 'Вынести мусор', isReady: false },
                            { id: 25, title: 'Сменить постельное', isReady: false }
                        ],
                        completedAt: null,
                        createdAt: '2026-03-04T10:00:00.000Z'
                    }
                ]
            },
            {
                id: 3,
                maxCards: Infinity,
                cards: [
                    {
                        id: 7,
                        cardTitle: 'Завершённый проект',
                        points: [
                            { id: 26, title: 'Сделать макет', isReady: true },
                            { id: 27, title: 'Написать код', isReady: true },
                            { id: 28, title: 'Протестировать', isReady: true },
                            { id: 29, title: 'Задеплоить', isReady: true },
                            { id: 30, title: 'Сдать заказчику', isReady: true }
                        ],
                        completedAt: '2024-03-10T14:30:00.000Z',
                        createdAt: '2024-03-01T10:00:00.000Z'
                    },
                    {
                        id: 8,
                        cardTitle: 'Достигнутая цель',
                        points: [
                            { id: 31, title: 'Выучить Vue 3', isReady: true },
                            { id: 32, title: 'Сделать проект', isReady: true },
                            { id: 33, title: 'Защитить работу', isReady: true }
                        ],
                        completedAt: '2026-03-09T11:20:00.000Z',
                        createdAt: '2026-03-01T10:00:00.000Z'
                    },
                    {
                        id: 9,
                        cardTitle: 'Марафон',
                        points: [
                            { id: 34, title: 'Неделя 1', isReady: true },
                            { id: 35, title: 'Неделя 2', isReady: true },
                            { id: 36, title: 'Неделя 3', isReady: true },
                            { id: 37, title: 'Неделя 4', isReady: true },
                            { id: 38, title: 'Финиш', isReady: true }
                        ],
                        completedAt: '2026-03-08T09:15:00.000Z',
                        createdAt: '2026-02-01T10:00:00.000Z'
                    }
                ]
            }
        ]
    }

    const columns = ref(loadInitialData())

    const isColumn1Locked = computed(() => {
        const column2 = columns.value.find(c => c.id === 2)
        return column2 && column2.cards.length >= column2.maxCards
    })

    const getCompletionPercent = (card) => {
        if (!card.points.length) return 0
        const completed = card.points.filter(p => p.isReady).length
        return Math.round((completed / card.points.length) * 100)
    }

    const overdueCardsCount = computed(() => {
        let count = 0
        const now = new Date()

        columns.value.forEach(column => {
            column.cards.forEach(card => {
                if (!card.completedAt && card.createdAt) {
                    const createdDate = new Date(card.createdAt)
                    const daysDiff = (now - createdDate) / (1000 * 60 * 60 * 24)

                    if (daysDiff > 1) {
                        count++
                    }
                }
            })
        })

        return count
    })

    const taskStats = computed(() => {
        let completed = 0
        let total = 0

        columns.value.forEach(column => {
            column.cards.forEach(card => {
                card.points.forEach(point => {
                    total++
                    if (point.isReady) {
                        completed++
                    }
                })
            })
        })

        return {
            completed,
            total,
            ratio: total > 0 ? Math.round((completed / total) * 100) : 0
        }
    })

    const findCard = (cardId) => {
        for (const column of columns.value) {
            const cardIndex = column.cards.findIndex(c => c.id === cardId)
            if (cardIndex !== -1) {
                return { column, card: column.cards[cardIndex], cardIndex }
            }
        }
        return null
    }

    const moveCard = (card, fromColumnId, toColumnId) => {
        const fromColumn = columns.value.find(c => c.id === fromColumnId)
        const toColumn = columns.value.find(c => c.id === toColumnId)

        if (!fromColumn || !toColumn) return false

        const cardIndex = fromColumn.cards.findIndex(c => c.id === card.id)
        if (cardIndex === -1) return false

        fromColumn.cards.splice(cardIndex, 1)
        toColumn.cards.push(card)
        return true
    }

    const checkAndMoveCard = (cardId) => {
        const found = findCard(cardId)
        if (!found) return

        const { column, card } = found
        const percent = getCompletionPercent(card)

        if (column.id === 3) return

        if (percent === 100 && column.id !== 3) {
            card.completedAt = new Date().toISOString()
            moveCard(card, column.id, 3)
            return
        }

        if (percent > 50 && column.id === 1) {
            if (!isColumn1Locked.value) {
                moveCard(card, 1, 2)
            }
            return
        }
    }

    const togglePoint = (cardId, pointId) => {
        const found = findCard(cardId)
        if (!found) return

        const { column, card } = found

        if (column.id === 1 && isColumn1Locked.value) {
            return
        }

        const point = card.points.find(p => p.id === pointId)
        if (!point) return

        point.isReady = !point.isReady
        checkAndMoveCard(cardId)
    }

    const saveToLocalStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(columns.value))
    }

    watch(columns, () => {
        saveToLocalStorage()
    }, { deep: true })

    return {
        columns,
        togglePoint,
        isColumn1Locked,
        overdueCardsCount,
        taskStats
    }
})