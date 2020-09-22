# social-media-website-db

## description
this is the backend to go along with social-1 check out the repo for that here --->  https://github.com/lkarnes/social-media-fe


# routes:
## posts:
#### POST api/posts/createpost
creates a post under the users account
#### GET api/posts/all/:id
gets all the posts for the users friends
#### GET api/posts/:id
gets the posts created by that user
#### GET api/posts/single/:id
gets a single post by id
#### GET api/posts/all/:status/:id
gets all friends posts based off of their relationship
#### GET api/posts/recent/:id/:days
gets post from the past specified amount of days
## friends:
### GET /api/friends/all/:id
gets all the users friends
### GET /api/friends/:id
gets specific friend
### POST /api/friends/add
adds a friend
### DELETE /api/friends/remove/:userId/:friendId
removes friendship
### PUT /api/friends/update
updates the friendship status
## users:
### POST /api/register
creates a new account and returns token
### POST /api/login
takes username and password and returns token
### PUT /api/edit/:id
edits the users account info
### DELETE /api/delete/:id
removes the account
## Comments:
** in progrss **
## Likes:
** in progrss **
