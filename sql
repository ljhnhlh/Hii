create table user(
    openid varchar(30),
    nikname varchar(20),
    avatarUrl text,
    gender  varchar(1),
    school  varchar(30),
    wechat  varchar(50),
    alipay  varchar(20),
    primary key (openid)
);