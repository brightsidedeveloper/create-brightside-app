import { BrightBaseCRUD } from 'bsdweb'

class FakeBrightBaseCRUD {
  async read() {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return Array.from(mockTodos).map((todo) => ({
      id: crypto.randomUUID(),
      label: todo,
    }))
  }
}

const mockTodos = [
  'Buy groceries',
  'Walk the dog',
  'Finish the project report',
  'Call the plumber',
  'Schedule a meeting with the team',
  'Read a book',
  'Water the plants',
  'Go for a run',
  'Cook dinner',
  'Plan the weekend trip',
  'Pay the bills',
  'Clean the house',
  'Take out the trash',
  'Do the laundry',
  'Organize the closet',
  'Mow the lawn',
  'Fix the leaky faucet',
  'Change the light bulbs',
  'Paint the living room',
  'Hang the picture frames',
]

const FakeTables = {
  todos: new FakeBrightBaseCRUD() as BrightBaseCRUD<{ id: string; label: string }>,
}

export default FakeTables
