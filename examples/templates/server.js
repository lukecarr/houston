const { withTemplate } = require('@moducate/houston')
const app = require('express')()

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

const [withBookNotFound] = withTemplate(({ bookId }) => ({
  type: 'https://express.example.com/not-found',
  status: 404,
  instance: `/books/${bookId}`,
  title: 'Book not found.',
  detail: `No book was found with the ID '${bookId}'.`,
}))

app.get('/books', (_, res) => {
  return res.json(books)
})

app.get('/books/:id', ({ params }, res) => {
  const book = books.find(x => x.id === params.id)
  if (book) {
    return res.json(book)
  }
  return withBookNotFound(res, { bookId: params.id })
})

app.listen(3000)
