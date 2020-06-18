<?php
namespace app\index\validate;
use think\Validate;
class User extends Validate
{

    protected $rule=[
        'name'=>'require',
        'user_sex'=>'require',
        // 'price_per_meter'=>'require',
    ];


    protected $message=[
        'name.require'=>'不得为空！',
        // 'project_name.unique'=>'项目名字不得重复！',
        // // 'title.max'=>'文章标题长度大的大于25个字符！',
        'user_sex.require'=>'不得为空！',
        // 'price_per_meter.require'=>'每平米单价不得为空！',
    ];

    protected $scene=[
        'add'=>['name','user_sex',],
        // 'edit'=>['project_name','project_price','price_per_meter'],
    ];





    

    




   

	












}
