import uuid
from datetime import datetime

from app import db
from sqlalchemy.dialects.postgresql import UUID


class Upload(db.Model):
    __tablename__ = 'upload'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    file_name = db.Column(db.String(), nullable=False)
    secure_file_name = db.Column(db.String(), nullable=False)
    upload_date = db.Column(db.BigInteger(), nullable=False)
    type = db.Column(db.String(), nullable=False)

    def __init__(self, file_name, secure_file_name, type):
        self.secure_file_name = secure_file_name
        self.file_name = file_name
        self.type = type
        self.upload_date = int(datetime.now().timestamp() * 1000)

    def __repr__(self):
        return '<id {}>'.format(self.id)
