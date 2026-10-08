import pool from "../config/db.js";

// GET all users
export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users_new ORDER BY id");

  return result.rows;
};


// GET user by ID
export const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users_new WHERE id = $1", [
    id,
  ]);

  return result.rows[0];
};


// CREATE user
export const createUser = async (user) => {
  const {
    name,
    email,
    mobile,
    city,
    occupation,
    salary,
  } = user;

  const result = await pool.query(
    `INSERT INTO users_new
      (name, email, mobile, city, occupation, salary)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name, email, mobile, city, occupation, salary],
  );

  return result.rows[0];
};


// UPDATE user
export const updateUser = async (id, user) => {
  const {
    name,
    email,
    mobile,
    city,
    occupation,
    salary,
  } = user;

  const result = await pool.query(
    `UPDATE users_new
     SET
       name = $1,
       email = $2,
       mobile = $3,
       city = $4,
       occupation = $5,
       salary = $6
     WHERE id = $7
     RETURNING *`,
    [name, email, mobile, city, occupation, salary, id],
  );

  return result.rows[0];
};


// DELETE user
export const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users_new WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0];
};

