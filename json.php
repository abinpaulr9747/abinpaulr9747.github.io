<?php 

$type = $_GET['type'];

$data = [];

switch( $type ){
    case 'ant':
        $data = [
            ['name'=>'ANT_1','status'=>'1'],
            ['name'=>'ANT_2','status'=>'0'],
            ['name'=>'ANT_3','status'=>'0'],
            ['name'=>'ANT_4','status'=>'0'],
            ['name'=>'ANT_5','status'=>'0'],
            ['name'=>'ANT_6','status'=>'1'],
            ['name'=>'ANT_7','status'=>'0'],
            ['name'=>'ANT_8','status'=>'1']
        ];
    break;
    case 'child':
        break;

}

echo json_encode($data);
exit;