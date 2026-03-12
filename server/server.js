const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());
app.get("/", (req, res) => {
    res.send("MedTracker backend running...");
});

// REGISTER
app.post("/register", (req, res) => {
    const {
        first_name,
        last_name,
        date_of_birth,
        address,
        email,
        contact_number,
        pass
    } = req.body;

    const sql = `
        INSERT INTO users
        (first_name, last_name, date_of_birth, address, email, contact_number, pass)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [first_name, last_name, date_of_birth, address, email, contact_number, pass], function (err) {
        if (err) {
            console.log("Register error:", err.message);
            return res.json({ success: false, message: "Registration failed" });
        }

        res.json({
            success: true,
            message: "User registered successfully"
        });
    });
});

// LOGIN
app.post("/login", (req, res) => {
    const { email, pass } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE email = ? AND pass = ?
    `;

    db.get(sql, [email, pass], (err, row) => {
        if (err) {
            console.log("Login error:", err.message);
            return res.json({ success: false, message: "Login failed" });
        }

        if (!row) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        res.json({
            success: true,
            message: "Login successful",
            user_id: row.id
        });
    });
});

/* ADD MEDICINE */
app.post("/add-medicine", (req, res) => {
    const {
        user_id,
        medicine_name,
        quantity_taken,
        dosage_per_tablet,
        total_dosage,
        medicine_date,
        medicine_time,
        status
    } = req.body;

    const sql = `
        INSERT INTO medicines
        (user_id, medicine_name, quantity_taken, dosage_per_tablet, total_dosage, medicine_date, medicine_time, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            user_id,
            medicine_name,
            quantity_taken,
            dosage_per_tablet,
            total_dosage,
            medicine_date,
            medicine_time,
            status
        ],
        function (err) {
            if (err) {
                console.log("Add medicine error:", err.message);
                return res.json({
                    success: false,
                    message: "Failed to save medicine"
                });
            }
        

            res.json({
                success: true,
                message: "Medicine saved successfully",
                medicine_id: this.lastID
            });
        }
    );
});

/* TODAY MEDICINES */
app.get("/today-medicines/:user_id", (req, res) => {
    const { user_id } = req.params;

    const now = new Date();
    const today =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    const sql = `
        SELECT * FROM medicines
        WHERE user_id = ? AND medicine_date = ?
        ORDER BY medicine_time ASC
    `;

    db.all(sql, [user_id, today], (err, rows) => {
        if (err) {
            return res.json({
                success: false,
                message: "Failed to fetch today's medicines"
            });
        }

        res.json({
            success: true,
            medicines: rows
        });
    });
});
//Update the  Medicine if it clicks the check button
app.put("/medicine-status/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const sql = `UPDATE medicines SET status = ? WHERE id = ?`;

    db.run(sql, [status, id], function (err) {
        if (err) {
            return res.json({
                success: false,
                message: "Failed to update status"
            });
;        }

        res.json({
            success: true,
            message: "Status updated successfully"
        });
    });
})

app.get("/medicine/:id", (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM medicines WHERE id = ?`;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.json({
                success: false,
                message: "Failed to fetch medicine"
            });
        }

        if (!row) {
            return res.json({
                success: false,
                message: "Medicine not found"
            });
        }

        res.json({
            success: true,
            medicine: row
        });
    });
});
//Edit medicine
app.put("/update-medicine/:id", (req, res) => {
    const { id } = req.params;

    const {
        medicine_name,
        quantity_taken,
        dosage_per_tablet,
        total_dosage,
        medicine_date,
        medicine_time,
        status
    } = req.body;

    const sql = `
        UPDATE medicines
        SET medicine_name = ?,
            quantity_taken = ?,
            dosage_per_tablet = ?,
            total_dosage = ?,
            medicine_date = ?,
            medicine_time = ?,
            status = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            medicine_name,
            quantity_taken,
            dosage_per_tablet,
            total_dosage,
            medicine_date,
            medicine_time,
            status,
            id
        ],
        function (err) {
            if (err) {
                return res.json({
                    success: false,
                    message: "Failed to update medicine"
                });
            }

            res.json({
                success: true,
                message: "Medicine updated successfully"
            });
        }
    );
});
//Delete Medicine
app.delete("/delete-medicine/:id", (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM medicines WHERE id = ?`;

    db.run(sql, [id], function (err) {
        if (err) {
            return res.json({
                success: false,
                message: "Failed to delete medicine"
            });
        }

        res.json({
            success: true,
            message: "Medicine deleted successfully"
        });
    });
});

/* MEDICINE HISTORY */
app.get("/history/:user_id", (req, res) => {
    const { user_id } = req.params;

    const sql = `
        SELECT * FROM medicines
        WHERE user_id = ?
        ORDER BY medicine_date DESC, medicine_time DESC
    `;

    db.all(sql, [user_id], (err, rows) => {
        if (err) {
            console.log("History error:", err.message);
            return res.json({
                success: false,
                message: "Failed to fetch history"
            });
        }

        res.json({
            success: true,
            history: rows
        });
    });
});

/* GET PROFILE */
app.get("/profile/:id", (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT id, first_name, last_name, date_of_birth, address, email, contact_number
        FROM users
        WHERE id = ?
    `;

    db.get(sql, [id], (err, row) => {
        if (err) {
            console.log("Profile error:", err.message);
            return res.json({
                success: false,
                message: "Failed to fetch profile"
            });
        }

        if (!row) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            profile: row
        });
    });
});

/* UPDATE PROFILE */
app.put("/profile/:id", (req, res) => {
    const { id } = req.params;

    const {
        first_name,
        last_name,
        date_of_birth,
        address,
        email,
        contact_number
    } = req.body;

    const sql = `
        UPDATE users
        SET first_name = ?,
            last_name = ?,
            date_of_birth = ?,
            address = ?,
            email = ?,
            contact_number = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [first_name, last_name, date_of_birth, address, email, contact_number, id],
        function (err) {
            if (err) {
                console.log("Update profile error:", err.message);
                return res.json({
                    success: false,
                    message: "Failed to update profile"
                });
            }

            res.json({
                success: true,
                message: "Profile updated successfully"
            });
        }
    );
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});