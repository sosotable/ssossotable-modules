<?php
// DAO 모듈
// 데이터베이스 연결, DML작업을 수행하는 코어 모듈
class DAO {
    // member variable
    private $conn=null;
    private static $DAO=null;
    // constructor
    // 생성자에서 DB연결 생성
    public function __construct()
    {
        // 공용 저장소 사용시 서버 정보 숨김 필요
        $this->$conn = new mysqli(
            "*",
            "*",
            "*",
            "*"
        );
        // Check connection
        if ($this->$conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    }
    function insert($table,$values) {
        try {
            $format='insert into %s values (%s)';
            $insert=sprintf($format,$table,$values);
            ($this->$conn)->query($insert);
        }
        catch (Exception $e) {
            return $e;
        } finally {
            return true;
        }

    }
    // static method
    function select($cols,$table,$option) {
        try {
            $format='select %s from %s where %s';
            $select=sprintf($format,$cols,$table,$option);
            return ($this->$conn)->query($select);
        } catch (Exception $e) {
            return $e;
        } finally {
            return true;
        }
        
    }

    function update($cols,$table,$option) {
        try {
            $format='update %s set %s where %s';
            $update=sprintf($format,$cols,$table,$option);
            ($this->$conn)->query($update);
        }
        catch (Exception $e) {
            return $e;
        } finally {
            return true;
        }
    }
    function delete($table,$option) {
        try {
            $format='delete from %s where %s';
            $delete=sprintf($format,$table,$option);
            ($this->$conn)->query($delete);
        }
        catch (Exception $e) {
            return $e;
        } finally {
            return true;
        }
    }
    function close() {
        $this->$conn->close();
    }
    
    // 싱글톤
    public static function factory()
    {
        if (self::$DAO == null) {
            self::$DAO = new DAO();
        }

        return self::$DAO;
    }
}
?>