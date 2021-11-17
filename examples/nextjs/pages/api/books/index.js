import { books } from "../../../data/books.json"

export default function handler(_, res) {
  return res.json(books)
}
