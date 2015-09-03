<?php
require_once 'VO.php';
require_once 'ConnectionProvider.php';
abstract  class DAO
{
   public abstract function create($table);
   public abstract function read($id);
   public abstract function update($table);
   public abstract function delete($table);
   public abstract function readAll();
}

class PostDAO extends DAO {
    
   public function read($id)
   {
   $post=new Post(); 
   foreach (ConnectionProvider::getConnection()->query("select * from posts where posts.id='$id'") as $row)
   {
   if ($row['id']==$id)
   {
   $post->id=$row['id'];
   $post->title=$row['title'];
   $post->post_text=$row['post_text'];
   $post->created=$row['created'];
   return $post;
   }
   }    
   return null;
   }
   public function readAll(){
   $posts=array();
   foreach (ConnectionProvider::getConnection()->query('select * from posts order by created desc limit '.$_REQUEST['alreadyDownloadedQuantity'].',5') as $row)
   {
   $post=new Post();      
   $post->id=$row['id'];
   $post->title=$row['title'];
   $post->post_text=$row['post_text'];
   $post->created=$row['created'];
   $posts[]=$post;
   }
   return $posts;
   }
   public function search(){
   $posts=array();
   foreach (ConnectionProvider::getConnection()->query('select * from posts order by created desc limit '.$_REQUEST['alreadyDownloadedQuantity'].',5 where title LIKE'."'%".$_REQUEST['searchPattern']."%'") as $row)
   {
   $post=new Post();      
   $post->id=$row['id'];
   $post->title=$row['title'];
   $post->post_text=$row['post_text'];
   $post->created=$row['created'];
   $posts[]=$post;
   }
   return $posts;
   }
    public function create($user) { //returns id of newly inserted user
    $insert_address="INSERT INTO address (state,street,zip,city) VALUES ('".$user->state."','".$user->street."','".$user->zip."','".$user->city."') ";
    ConnectionProvider::getConnection()->query($insert_address);
    $sql="INSERT INTO user (telephone,name,email,address_id) VALUES ('".$user->telephone."','".$user->name."','".$user->email."','".ConnectionProvider::getConnection()->lastInsertId()."') ";
    ConnectionProvider::getConnection()->query($sql);
    return ConnectionProvider::getConnection()->lastInsertId();
    }

    public function delete($user) {
    $sql="DELETE FROM user WHERE user.id='".$user->id."'";  
    ConnectionProvider::getConnection()->query($sql);
    }

    public function update($user) {
    $sql="UPDATE address adr inner join user usr on adr.id =usr.address_id SET adr.state='$user->state',adr.street='$user->street',adr.zip='$user->zip',adr.city='$user->city',name='$user->name',email='$user->email',telephone='$user->telephone'  WHERE usr.id=$user->id;";
    ConnectionProvider::getConnection()->query($sql);
    }

}

class AccountDAO extends DAO{
    public function create($data) {
    $sql="INSERT INTO accounts (email,password) VALUES ('".$data->email."','".sha1($data->password)."') ";
   echo $sql;
    ConnectionProvider::getConnection()->query($sql);
    }

    public function delete($table) {
        
    }

    public function read($id) {
        
    }

    public function readAll() {
        
    }

    public function update($table) {
        
    }

}
