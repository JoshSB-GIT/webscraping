from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, make_response
from Routes.WebScrapingRoutes import web_scraping
from Routes.RedditRoutes import reddit_app
from Routes.DashBoardRoutes import dash

app = Flask(__name__)
CORS(app, supports_credentials=True)


app.register_blueprint(web_scraping)
app.register_blueprint(reddit_app)
app.register_blueprint(dash)


@cross_origin
@app.route('/', methods=['GET'])
def home():
    return make_response(jsonify({'message':'hello word!'}), 200)