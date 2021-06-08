# university-task-api

CREATE LOGIN NewAdminName WITH PASSWORD ='ABCD'
GO

CREATE USER NewAdminName FOR LOGIN NewAdminName;  
GO

CREATE TABLE Fonds
(
fond_id INT PRIMARY KEY IDENTITY ,
fond_name VARCHAR(50) NOT NULL ,
locition VARCHAR(50) NOT NULL
);

CREATE TABLE Animals
(
id INT PRIMARY KEY IDENTITY ,
fonsId INT NOT NULL ,
name VARCHAR(20) NOT NULL,
commonName VARCHAR(50) NOT NULL,
scientificName VARCHAR(50) NOT NULL,
type VARCHAR(100) NOT NULL,
size VARCHAR(300) NOT NULL,
diet VARCHAR(300) NOT NULL,
habitat VARCHAR(300) NOT NULL,
range VARCHAR(300) NOT NULL
);

CREATE TABLE Donations
(
id INT PRIMARY KEY IDENTITY ,
perconId INT NOT NULL ,
fondId INT NOT NULL,
amount INT NOT NULL,
date DATE NOT NULL,
);

CREATE TABLE Messeges
(
id INT PRIMARY KEY IDENTITY ,
perconId INT NOT NULL ,
fondId INT NOT NULL,
messege TEXT NOT NULL,
date DATE NOT NULL,
);

SELECT name, email FROM People
SELECT name,locition FROM Fonds
SELECT perconId,fondId FROM Donations

SELECT People.name, People.email, Fonds.name, Donations.amount, Donations.date
FROM Donations, People, Fonds
WHERE (Donations.perconId = People.id) AND (Donations.fondId = Fonds.id)

SELECT Animals.name, Animals.commonName, Fonds.name
FROM Animals, Fonds
WHERE Animals.fonsId = Fonds.id
