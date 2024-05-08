from app import db


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(256), nullable=False)


def initialize_database(db):
    db.create_all()

    if not Book.query.first():
        book1 = Book(title='Book 1', author='Author 1', description='Description 1')
        book2 = Book(title='Book 2', author='Author 2', description='Description 2')
        book3 = Book(title='Book 3', author='Author 3', description='Description 3')
        db.session.add(book1)
        db.session.add(book2)
        db.session.add(book3)
        db.session.commit()
