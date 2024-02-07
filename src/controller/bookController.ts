import { Request, Response } from 'express';
import { BookService } from '../service/bookService';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }
    public getBook = async (req: Request, res: Response): Promise<void> => {
        const bookId = req.params.id;
        const book = await this.bookService.getBookById(bookId);
        res.json({ message: 'Book found', data: book });
    };
    public getBooks = async (req: Request, res: Response): Promise<void> => {
        const books = await this.bookService.getAllBooks();
        res.json({ message: 'Books found', data: books });
    };
    public addBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const bookData = req.body;
            const newBook = await this.bookService.addBook(bookData);
            res.json({ message: 'Book added', data: newBook });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    public updateBook = async (req: Request, res: Response): Promise<void> => {
        const bookId = req.params.id;
        const bookData = req.body;
        const updatedBook = await this.bookService.updateBook(bookId, bookData);
        res.json({ message: 'Book updated', data: updatedBook });
    }
    public deleteBook = async (req: Request, res: Response): Promise<void> => {
        const bookId = req.params.id;
        const deletedBook = await this.bookService.deleteBook(bookId);
        res.json({ message: 'Book deleted', data: deletedBook });
    }
}


