"""Update models

Revision ID: 1882de53e982
Revises: 6d4bf3fc8dbc
Create Date: 2025-02-17 18:34:01.873498

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1882de53e982'
down_revision: Union[str, None] = '6d4bf3fc8dbc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('mnemonic_phrase', sa.String(), nullable=True))
    op.create_index(op.f('ix_users_mnemonic_phrase'), 'users', ['mnemonic_phrase'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_users_mnemonic_phrase'), table_name='users')
    op.drop_column('users', 'mnemonic_phrase')
    # ### end Alembic commands ###
