import connection from "../database/database.js";

export async function getCustomers(req, res) {
    const { cpf } = req.query;

    try {
        if (cpf) {
            const listing = await connection.query("SELECT * FROM clientes WHERE cpf ILIKE = $1;", [`${cpf}%`]);
            return res.send(listing.rows);
        }

        const allCustomers = await connection.query("SELECT * FROM clientes;");
        res.send(allCustomers.rows);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
export async function getCustomersById(req, res) {
    const { id } = req.params;

    try {
        const customersId = await connection.query("SELECT * FROM clientes WHERE id = $1;", [id]);

        if (customersId.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.send(customersId.rows);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export async function postCustomers(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customers;
    try {
        await connection.query("INSERT INTO clientes (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);", [name, phone, cpf, birthday]);

        res.sendStatus(201);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export async function putCustomers(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customers;
    const id = res.locals.id;
    try {

        await connection.query("UPDATE clientes SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;", [name, phone, cpf, birthday, id]);

        res.sendStatus(200);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}