from flask import jsonify
from app import app


def notFound(error):
    return jsonify({'Message': str(error)}), 404


def methodNotAllowed(error):
    return jsonify({'Message': str(error)}), 405


def unAuthorized(error):
    return jsonify({'Message': str(error)}), 401


if __name__ == '__main__':
    app.register_error_handler(404, notFound)
    app.register_error_handler(405, methodNotAllowed)
    app.register_error_handler(401, unAuthorized)
    app.run(debug=True)