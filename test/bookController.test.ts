import request from 'supertest';
import app from '../src/app';

describe('CRUD operations', () => {
  let createdId: string;

  it('should create a new book', async () => {
    const book = {
      title: 'Book 1',
      author: 'writer',
      available: true,
      updatedEdition: false,
    };

    const res = await request(app).post('/api/v1/books').send(book);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Book created successfully');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.title).toBe(book.title);

    createdId = res.body.data.id;
  });

  it('should retrieve all books', async () => {
    const res = await request(app).get('/api/v1/books');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Books fetched');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should retrieve a book by ID', async () => {
    const res = await request(app).get(`/api/v1/books/${createdId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Book found');
    expect(res.body.data).toHaveProperty('id', createdId);
  });

  it('should update an existing book', async () => {
    const updated = {
      title: 'Book 1',
      author: 'writer',
      available: false,
      updatedEdition: true,
    };

    const res = await request(app).put(`/api/v1/books/${createdId}`).send(updated);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Book updated');
    expect(res.body.data.title).toBe(updated.title);
  });

  it('should delete a book', async () => {
    const res = await request(app).delete(`/api/v1/books/${createdId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Book deleted');
  });
});
