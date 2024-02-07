// src/service/UserService.ts
import bcrypt from "bcrypt";
import { BookRepository } from "../repository/bookRepository"


export class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }
    public getAllBooks = async (): Promise<any> => {
        return this.bookRepository.getAll();
    };
    public getBookById = async (id: string): Promise<any> => {
        return this.bookRepository.findBookById(id);
    };
    public addBook = async (bookData: any): Promise<any> => {
        return this.bookRepository.addBook(bookData);
    };
    public updateBook = async (id: string, bookData: any): Promise<any> => {
        return this.bookRepository.updateBook(id, bookData);
    }
    public deleteBook = async (id: string): Promise<any> => {
        return this.bookRepository.deleteBook(id);
    }
}
