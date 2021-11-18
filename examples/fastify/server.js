const { withError } = require('@moducate/houston')
const app = require('fastify')()

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

app.get('/books', () => {
  return { books }
})

app.get('/books/:id', ({ params }, res) => {
  const book = books.find(x => x.id === params.id)
  if (book) {
    return book
  }
  return withError(res.raw, {
    type: 'https://express.example.com/not-found',
    status: 404,
    instance: `/books/${params.id}`,
    title: 'Book not found.',
    detail: `No book was found with the ID '${params.id}'.`
  })
})

app.listen(3000)
