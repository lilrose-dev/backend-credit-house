CREATE DATABASE credit;

CREATE TABLE building_company(
    building_company_id SERIAL PRIMARY KEY NOT NULL,
    building_company_name TEXT
);

CREATE TABLE complexes(
    complexes_id SERIAL PRIMARY KEY NOT NULL,
    complexes_name TEXT,
    complexes_address TEXT,
    building_company_id INT REFERENCES building_company(building_company_id) ON DELETE CASCADE
);

CREATE TABLE complexes_room (
    complexes_room_id SERIAL PRIMARY KEY NOT NULL,
    complexes_room_price BIGINT,
    complexes_room_counts INT,
    complexes_room_size BIGINT,
    complexes_id INT REFERENCES complexes(complexes_id) ON DELETE CASCADE
);


CREATE TABLE bank(
    bank_id SERIAL PRIMARY KEY NOT NULL,
    bank_name TEXT,
    upto INT,
    starting_payment INT,
    bank_service INT
);

---house price calc
CREATE OR REPLACE FUNCTION house_price(id INT)
RETURNS TABLE(house_price INT)
LANGUAGE plpgsql
AS
$$
BEGIN
    RETURN QUERY
    SELECT
        (complexes_room_size * complexes_room_price)
    FROM
        complexes_room
    WHERE
        complexes_room_id = id;
END
$$;


----bank calc
CREATE OR REPLACE FUNCTION bankCalc(id INT)
RETURNS TABLE(bankId INT, bankName TEXT, bankUpto INT, startingPayment INT, bankService INT)
LANGUAGE plpgsql
AS
$$
BEGIN
    RETURN QUERY SELECT
       bank_id,
       bank_name,
       upto,
       starting_payment,
       bank_service
    FROM
        bank
    WHERE
        upto - (SELECT * FROM house_price(id)) = (SELECT MIN(upto) - (SELECT * FROM house_price(id))
        FROM bank WHERE upto > (SELECT * FROM house_price(id)));
END
$$;


---bank calc with year


CREATE FUNCTION calc(id int, year int)
RETURNS TABLE(house_price int, bank_startingpayment int, monthly_payment int, bankservice int)
LANGUAGE plpgsql
AS
$$
BEGIN

    RETURN 
    QUERY 
    SELECT  
    (SELECT * FROM house_price(id)),
    (SELECT 
        starting_payment * ((SELECT * FROM house_price(id)) / 100)
    FROM 
        bank
    WHERE 
        upto-(SELECT * FROM house_price(id)) = (SELECT MIN(upto-(SELECT * FROM house_price(id))) FROM bank
        WHERE upto > (SELECT * FROM house_price(id)))),
    (((SELECT * FROM house_price(id)) - (SELECT 
        starting_payment *((SELECT * FROM house_price(id)) / 100)
    FROM 
        bank 
    WHERE 
        upto-(SELECT * FROM house_price(id)) = (SELECT MIN(upto-(SELECT * FROM house_price(id))) FROM bank 
        WHERE upto > (SELECT * FROM house_price(id)))))/ (year * 12)),
    (SELECT 
        bank_service
    FROM 
        bank 
    WHERE 
        upto-(SELECT * FROM house_price(id)) = (SELECT MIN(upto-(SELECT * FROM house_price(id))) FROM bank
        WHERE upto > (SELECT * FROM house_price(id))))
    FROM complexes_room WHERE complexes_room_id = id;

END
$$;
