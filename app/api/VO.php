<?php

class Post
{
    var $id;
    var $title;
    var $post_text;
    var $created;
    var $commentsQuantity;
}

class Comment
{
    var $id;
    var $text;
    var $created;  
    var $post_id;
    var $author_name;
}
