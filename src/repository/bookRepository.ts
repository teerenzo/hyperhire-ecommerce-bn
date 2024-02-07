import { Book } from "../entity/Book";
export class BookRepository {

    public getAll = async (): Promise<any> => {
        return await Book.findAll();
    };

    public findBookById = async (id: string): Promise<any> => {
        return await Book.findByPk(id);
    };

    public addBook = async (bookData: any): Promise<any> => {
        return await Book.create(bookData);
    };

    public updateBook = async (id: string, bookData: any): Promise<any> => {
        return await Book.update(bookData, { where: { id } });
    }

    public deleteBook = async (id: string): Promise<any> => {
        return await Book.destroy({ where: { id } });
    }


}
