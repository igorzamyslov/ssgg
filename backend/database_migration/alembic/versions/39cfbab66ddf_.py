"""empty message

Revision ID: 39cfbab66ddf
Revises: a8fb7b1b7413
Create Date: 2021-10-25 18:53:16.534561

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = '39cfbab66ddf'
down_revision = 'a8fb7b1b7413'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('application_references',
    sa.Column('id', sa.Integer(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_application_references_id'), 'application_references', ['id'], unique=False)
    op.create_table('_similar_applications',
    sa.Column('app_id', sa.Integer(), nullable=False),
    sa.Column('similar_app_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['app_id'], ['applications.id'], ),
    sa.ForeignKeyConstraint(['similar_app_id'], ['application_references.id'], ),
    sa.PrimaryKeyConstraint('app_id', 'similar_app_id')
    )
    op.create_index(op.f('ix__similar_applications_app_id'), '_similar_applications', ['app_id'], unique=False)
    op.create_index(op.f('ix__similar_applications_similar_app_id'), '_similar_applications', ['similar_app_id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix__similar_applications_similar_app_id'), table_name='_similar_applications')
    op.drop_index(op.f('ix__similar_applications_app_id'), table_name='_similar_applications')
    op.drop_table('_similar_applications')
    op.drop_index(op.f('ix_application_references_id'), table_name='application_references')
    op.drop_table('application_references')
    # ### end Alembic commands ###