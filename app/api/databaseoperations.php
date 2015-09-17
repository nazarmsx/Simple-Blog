<?php

include_once 'DAOInclude.php';

interface DbCommand {

    function execute();
}

class UpdateUserCommand implements DbCommand {

    function execute() {
        $user = json_decode($_GET['user']);
        $dao = new UserDAO();
        $dao->update($user);
    }

}

class DeleteUserCommand implements DbCommand {

    function execute() {
        $user = json_decode($_GET['user']);
        $dao = new UserDAO();
        $dao->delete($user);
    }

}

class CreateUserCommand implements DbCommand {

    function execute() {
        $user = json_decode($_GET['user']);
        $dao = new UserDAO();
        $user->id = $dao->create($user);
        echo json_encode($user);
    }

}

class ReadAllPostsCommand implements DbCommand {

    function execute() {
        $dao = new PostDAO();
        $res = '';
        $res = '{"records":' . json_encode($dao->readAll()) . '}';
        return $res;
    }

}

class ReadPostCommand implements DbCommand {

    function execute() {
        $dao = new PostDAO();
        $res = '';
        $res = '{"records":' . json_encode($dao->read($_REQUEST['id'])) . '}';
        return $res;
    }

}

class SearchPosts implements DbCommand {

    function execute() {
        $dao = new PostDAO();
        $res = '';
        $res = '{"records":' . json_encode($dao->search()) . '}';
        return $res;
    }

}

class PostComments implements DbCommand {

    function execute() {
        $dao = new CommentDAO();
        $res = '';
        $res = '{"records":' . json_encode($dao->readAll()) . '}';
        return $res;
    }

}

class RegisterUserCommand implements DbCommand {

    public function execute() {
        $user = json_decode($_GET['user']);
        $dao = new AccountDAO();
        $dao->create($user);
    }

}
