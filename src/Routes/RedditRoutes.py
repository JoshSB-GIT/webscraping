import praw
from flask import (
    Blueprint, jsonify, make_response
)
from flask_cors import cross_origin
from dotenv import load_dotenv
import os

load_dotenv()


reddit_app = Blueprint('reddit', __name__)
print(os.getenv('CLIENT_ID'),
    os.getenv('CLIENT_SECRET'),
    os.getenv('USER_AGENT'))
reddit = praw.Reddit(
    client_id=os.getenv('CLIENT_ID'),
    client_secret=os.getenv('CLIENT_SECRET'),
    user_agent=os.getenv('USER_AGENT')
)


@reddit_app.route('/reddit_posts')
def get_posts():
    try:
        top_limit: int = 10
        new_limit: int = 10
        hot_limit: int = 10
        subreddit_theme: str = 'hackers'
        top_list = []
        new_list = []
        hot_list = []

        subreddit = reddit.subreddit(subreddit_theme)

        top_post = subreddit.top(limit=top_limit)
        new_post = subreddit.new(limit=new_limit)
        hot_post = subreddit.hot(limit=hot_limit)

        for post in top_post:
            top_list.append({
                "title": str(post.title),
                "id": str(post.id),
                "autor": str(post.author),
                "url": str(post.url),
                "score": str(post.score),
                "total_comment": str(post.num_comments),
                "created": str(post.created_utc),
                # "comments": [comment.body for comment in post.comments]
            })

        for post in new_post:
            new_list.append({
                "title": str(post.title),
                "id": str(post.id),
                "autor": str(post.author),
                "url": str(post.url),
                "score": str(post.score),
                "total_comment": str(post.num_comments),
                "created": str(post.created_utc),
                # "comments": [comment.body for comment in post.comments]
            })

        for post in hot_post:
            hot_list.append({
                "title": str(post.title),
                "id": str(post.id),
                "autor": str(post.author),
                "url": str(post.url),
                "score": str(post.score),
                "total_comment": str(post.num_comments),
                "created": str(post.created_utc),
                # "comments": [comment.body for comment in post.comments]
            })
            
        return {
            'hot_list': hot_list,
            'new_list': new_list,
            'top_list': top_list
        }
    
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 400)
