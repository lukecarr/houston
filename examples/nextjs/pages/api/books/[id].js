import { withError } from '@moducate/houston'

const books = [
  {
    id: '1',
    name: 'The Da Vinci Code',
    author: 'Dan Brown',
    publisher: 'Transworld'
  },
  {
    id: '2',
    name: 'Harry Potter and the Deathly Hallows',
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury'
  }
]

export default function handler ({ query }, res) {
  const book = books.find(x => x.id === query.id)
  if (book) {
    return res.json(book)
  }
  return withError(res, {
    type: 'https://express.example.com/not-found',
    status: 404,
    instance: `/books/${query.id}`,
    title: 'Book not found.',
    detail: `No book was found with the ID '${query.id}'.`
  })
}
