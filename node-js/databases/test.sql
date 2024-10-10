-- Active: 1727588788173@@localhost@3306@test1
drop database if exists `test1`;

create database `test1`;

use `test1`;

show databases;

show tables;

-- BASIC QUERY
drop table if exists Students;
create table Students(
	id int primary key auto_increment,
	name varchar(255) not null
);

insert into Students(name) values ("joun");
insert into Students(name) values ("dat nguyen");
insert into Students(name) values ("joun nguyen");
select * from Students where name like "jo%";
select * from Students;


-- TRANSACTION
show tables;

drop table if EXISTS Wallet_Users;
create table Wallet_Users(
	id int primary key auto_increment,
	name varchar(255) not null,
	balance int not null default 500
);

insert into Wallet_Users(name, balance) values
	("Joun", 1000),
	("Joseph", 2000);

select * from Wallet_Users;
update Wallet_Users set balance = balance + 100 where name = "Joun";














