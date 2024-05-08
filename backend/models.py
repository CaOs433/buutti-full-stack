from app import db


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(256), nullable=False)


def initialize_database(db):
    db.create_all()

    if not Book.query.first():
        book1 = Book(
            title='The Great Gatsby',
            author='F. Scott Fitzgerald',
            description='A novel about the American Dream and the Roaring Twenties.'
        )
        book2 = Book(
            title='To Kill a Mockingbird',
            author='Harper Lee',
            description='A story of racial injustice and the loss of innocence in the American South.'
        )
        book3 = Book(
            title='1984',
            author='George Orwell',
            description='A dystopian novel depicting a totalitarian society ruled by Big Brother.'
        )
        book4 = Book(
            title='Pride and Prejudice',
            author='Jane Austen',
            description='A classic romance novel set in 19th-century England.'
        )
        db.session.add(book1)
        db.session.add(book2)
        db.session.add(book3)
        db.session.add(book4)
        db.session.commit()
