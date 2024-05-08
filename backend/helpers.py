from flask import jsonify


def jsonifyBook(book):
    from models import Book
    if isinstance(book, Book):
        return jsonify({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'description': book.description
        })
