SET NAMES UTF8;
DROP DATABASE IF EXISTS ele;
CREATE DATABASE ele CHARSET = UTF8;
USE ele;
/*用户信息表*/
CREATE TABLE users(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uphone VARCHAR(11),
    upwd VARCHAR(8)
);
INSERT INTO users VALUES
(101,12345678912,111111),
(102,12345678923,222222);

/*城市表*/
CREATE TABLE city(
    cid INT PRIMARY KEY,
    cname VARCHAR(16)
);
INSERT INTO city VALUES
(201,'成都'),
(202,'绵阳');

/*商家地区表*/
CREATE TABLE area(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    aName VARCHAR(32),
    cityId INT
);
INSERT INTO area VALUES
(501,'天府广场',201),
(502,'春熙路',202);

/*购物车表*/
CREATE TABLE cart(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    userId INT
);
INSERT INTO cart VALUES
(301,101);

/*购物车详情表*/
CREATE TABLE cart_detail(
    did INT PRIMARY KEY AUTO_INCREMENT,
    cartId INT,
    productId INT,
    count INT
);
INSERT INTO cart_detail VALUES
(NULL, 301, 601, 1),
(NULL, 301, 602, 2);

/*商家表*/
CREATE TABLE seller(
    sid INT PRIMARY KEY,
    sName VARCHAR(32),
    areaId INT,
    cityId INT,
    img VARCHAR(32),
    deliverFee FLOAT(3,2),
    boxFee FLOAT(3,2),
    insurance BOOLEAN,
    compen BOOLEAN,
    eval INT,
    sTime INT,
    startSend FLOAT(2)
);
INSERT INTO seller VALUES
(401,'书亦烧仙草',501,201,'img/seller_5.png','2.0','0.5',1,0,230,50,20),
(402,'七十一号豆汤饭',501,201,'img/seller_2.png','3.0','0.5',1,1,350,20,20),
(403,'鲍师傅',501,201,'img/seller_3.png','2.5','0.5',1,1,360,30,15),
(404,'巴布尔印巴餐厅',501,201,'img/seller_4.png','2.5','0.5',1,1,310,40,18),
(405,'港久茶餐厅',501,201,'img/seller_1.png','3.0','0.5',1,1,300,21,15),
(406,'跷脚牛肉',502,202,'img/seller_6.jpeg','3.0','0.5',1,1,240,20,30),
(407,'人民食堂',502,202,'img/seller_7.png','1.5','0.5',1,0,250,25,30),
(408,'顺吉',502,202,'img/seller_8.jpeg','2.5','0.5',1,0,260,30,30);

/*产品信息表*/
CREATE TABLE product(
    pid INT PRIMARY KEY AUTO_INCREMENT,
    pname VARCHAR(16),
    pimg VARCHAR(32),
    price FLOAT(5,2),
    pcount INT,
    evalCount INT,
    sellerId INT
);
INSERT INTO product VALUES
(601, '牛魔王黑砖奶茶','img/p1.jpeg','10',113,102,401),
(602, '四季春燕麦奶茶','img/p2.jpeg','12',123,103,401),
(NULL, '小芋圆烧仙草（中杯）','img/p3.jpeg','12',120,104,401),
(NULL, '柠檬益菌多','img/p4.jpeg','13',122,105,401),
(NULL, '焦糖珍奶','img/p5.jpeg','10',133,106,401),
(NULL, '台湾四季春茶','img/p6.jpeg','7',127,107,401),
(NULL, '椒麻心舌','img/p7.jpeg','25.8',128,108,406),
(NULL, '炝凤尾','img/p8.jpeg','12.8',129,109,406),
(NULL, '荤豆花','img/p9.jpeg','30.8',130,110,406),
(NULL, '酸菜鱼','img/p10.jpeg','32.8',131,111,406),
(NULL, '农家小炒肉盖饭','img/p11.jpeg','15.8',132,112,406),
(NULL, '辣子鸡','img/p12.jpeg','26.8',133,113,406),
(NULL, '酸菜粉丝汤','img/p13.jpeg','12.8',134,114,406),
(NULL, '鱼香肉丝','img/p14.jpeg','23.8',135,115,406),
(NULL, '豇豆茄子','img/p15.jpeg','13.8',136,116,406),
(NULL, '干煸兔','img/p16.jpeg','32.8',137,117,406);

/*订单详情表*/
CREATE TABLE order_detail(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    cartId INT,
    areaId INT
);