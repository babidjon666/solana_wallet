"""Add mnemonic field to User model

Revision ID: b428d816bc18
Revises: 1882de53e982
Create Date: 2025-02-17 18:40:40.126284

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b428d816bc18'
down_revision: Union[str, None] = '1882de53e982'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('mnemonic', sa.String(), nullable=True))
    op.drop_index('ix_users_mnemonic_phrase', table_name='users')
    op.drop_column('users', 'mnemonic_phrase')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('mnemonic_phrase', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_index('ix_users_mnemonic_phrase', 'users', ['mnemonic_phrase'], unique=False)
    op.drop_column('users', 'mnemonic')
    # ### end Alembic commands ###
