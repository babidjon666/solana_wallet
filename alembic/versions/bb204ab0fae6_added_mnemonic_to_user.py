"""Added mnemonic to User

Revision ID: bb204ab0fae6
Revises: b428d816bc18
Create Date: 2025-02-17 23:40:49.539583

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bb204ab0fae6'
down_revision: Union[str, None] = 'b428d816bc18'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('private_key', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'private_key')
    # ### end Alembic commands ###
