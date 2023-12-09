import { Router } from 'express'
import { Todo } from '../models/todo'
let todos: Todo[] = []
const router = Router()

type reqBody = { text : string}
type reqParams = { todoId : string}

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos })
})

router.post('/todo', (req, res, next) => {
    const body = req.body as reqBody
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }
    todos.push(newTodo)
    return res.status(201).json({ message: 'Added Todo', todo: newTodo, todos: todos })
})

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as reqParams
    const tid = params.todoId
    const body = req.body as reqBody
    const todoIndex = todos.findIndex(todoitem => todoitem.id === tid)
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text
        }
        return res.status(200).json({ message: 'Updated todo', todos: todos })
    }
    res.status(404).json({ message: 'Could not find todo for this id' })
})

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as reqParams
    todos = todos.filter(todoitem => todoitem.id !== params.todoId)
    res.status(200).json({ message: 'Deleted Todo', todos: todos })
})



export default router;