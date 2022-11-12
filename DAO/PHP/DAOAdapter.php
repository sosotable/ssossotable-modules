<?php
    // 클라이언트가 접근하는 API클래스
    include 'DAO.php';
    include 'DAOOptions.php';
    class DAOAdapter {
        private static $DAOAdapter=null;
        public function __construct()
        {
        }
        public function execute(...$args) {
            $option=-1;
            $arg=$args[0];
            if(is_numeric($arg[0])) { $option=$arg[0]; }
            else {
                if(!strcmp($arg[0],'insert')) { $option=1; }
                else if(!strcmp($arg[0],'select')) { $option=2; }
                else if(!strcmp($arg[0],'update')) { $option=3; }
                else if(!strcmp($arg[0],'delete')) { $option=4; }
            }
            try {
                switch ($option) {
                    //insert
                    case 1:
                        $result=((DAO::factory())->insert(
                            $arg[1],
                            $arg[2]));
                        break;
                    //select
                    case 2:
                        $result=((DAO::factory())->select(
                            $arg[1],
                            $arg[2],
                            $arg[3]));
                        if($result->num_rows>0) {
                            echo json_encode($result->fetch_all(),JSON_UNESCAPED_UNICODE);
                        }
                        else {
                            $arr=array();
                            echo json_encode($arr,JSON_UNESCAPED_UNICODE);
                        }
                        break;
                    //update
                    case 3:
                        $result=((DAO::factory())->update(
                            $arg[1],
                            $arg[2],
                            $arg[3]));
                        break;
                    //delete
                    case 4:
                        $result=((DAO::factory())->delete(
                            $arg[1],
                            $arg[2]));
                        break;
                    default:
                        break;
                }
            }
            catch(Exception $e) {
                echo $e;
            }
        }
        public function close() {
            (DAO::factory())->close();
        }
        public static function factory()
        {
            if (self::$DAOAdapter == null) {
                self::$DAOAdapter = new DAOAdapter();
            }
            return self::$DAOAdapter;
        }
    }
?>