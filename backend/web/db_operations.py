""" Includes common DB Operations relevant for the web application """
import random
from typing import Set

from sqlalchemy.exc import MultipleResultsFound, NoResultFound
from sqlalchemy.orm import Session, selectinload

import common.database as db


class DatabaseOperationError(Exception):
    """ Raised in case there's a problem in database operations """


def get_known_app_ids(session: Session) -> Set[int]:
    """ Returns all APP IDs known to the database """
    return {_id for [_id] in session.query(db.Application.id).all()}


def get_application(session: Session, app_id: int) -> db.Application:
    """ Get application by its id """
    try:
        return (session.query(db.Application)
                .options(selectinload(db.Application.screenshots),
                         selectinload(db.Application.similar_apps))
                .one(app_id))
    except (NoResultFound, MultipleResultsFound) as error:
        raise DatabaseOperationError from error


def get_random_application(session: Session) -> db.Application:
    """
    Get random application based on the filters
    NOTE: Filters are hardcoded for now
    """
    query = (session.query(db.Application.id)
             .join(db.Screenshot, db.Type)
             .filter(db.Type.name == "game")
             .group_by(db.Application.id))
    query_with_filters = query.filter(db.Application.reviews_count >= 500)
    try:
        app_id = random.choice(query_with_filters.all())
    except IndexError:
        # For dev purposes:
        # If app with filters is not found - fallbck to any app
        try:
            app_id = random.choice(query.all())
        except IndexError as error:
            raise DatabaseOperationError from error
    return get_application(session, app_id)
