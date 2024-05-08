from flask import jsonify, request

from app import app, db
from helpers import jsonifyBook
from models import Book


@app.route('/books', methods=['GET'])
def get_books():
    with app.app_context():
        books = Book.query.all()

    book_list = []
    for book in books:
        book_data = {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'description': book.description
        }
        book_list.append(book_data)
        
    return jsonify(book_list)


@app.route('/books', methods=['POST'])
def add_book():
    new_book = request.json

    with app.app_context():
        new_book_obj = Book(title=new_book['title'], author=new_book['author'], description=new_book['description'])
        db.session.add(new_book_obj)
        db.session.flush()
        db.session.commit()
        saved_book = Book.query.order_by(Book.id.desc()).first()

    return jsonifyBook(saved_book), 201


@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    updated_book = request.json

    with app.app_context():
        book_to_update = Book.query.get(book_id)

        if book_to_update is not None:
            book_to_update.title=updated_book['title']
            book_to_update.author=updated_book['author']
            book_to_update.description=updated_book['description']
            db.session.commit()

            return jsonifyBook(book_to_update), 200
    
    return 'No book found with given ID.', 404


@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    with app.app_context():
        book_to_delete = Book.query.get(book_id)

        if book_to_delete is not None:
            db.session.delete(book_to_delete)
            db.session.commit()

            return 'Successfully deleted the book with ID {}'.format(book_id), 204
    
    return 'No book found with given ID.', 404
