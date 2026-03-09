//Import Express,mysql2,cors
const express =require("express");
const db = require("./database");
const cors = require("cors");

const app = express();
const PORT = 3000;
//Middleware
app.use(cors());
app.use(express.json());
 
//Testing if the Route in running
app.get('/',(req,res)=>{
    res.send("MedTracker server is running...");
});

//Routers

//Sign up
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

    db.run(
        sql,
        [first_name, last_name, date_of_birth, address, email, contact_number, pass],
        function (err) {
            if (err) {
                console.error("Register error:", err.message);
                return res.status(500).json({
                    success: false,
                    message: "Failed to register user"
                });
            }

            res.json({
                success: true,
                message: "User registered successfully",
                user_id: this.lastID
            });
        }
    );
});

//Log-in
app.post("/login",(req,res)=>{
    const {email,pass} = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND pass = ?`;

    db.get(sql, [email,pass],(err,row)=>{
        if(err){
            console.error("Login error", err.message);
            return res.status(500).json({
                success: false,
                message:"Database error"
            });
        }
        res.json({
            success:true,
            message: "Login Successful",
            user:row
        });
    });
});

//Add medicine
app.post("/add_medicine",(req,res)=>{
    const{
        user_id,
        medicine_name,
        quantity_taken,
        dosage_per_tablet,
        total_dosage,
        medicine_date,
        medicine_time,
        status
    }=req.body;

    const sql = `INSERT INTO medicines (
    user_id,
    medicine_name,
    quantity_taken,
    dosage_per_tablet,
    total_dosage,
    medicine_date,
    medicine_time,
    status
    )VALUES(?,?,?,?,?,?,?,?)`

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
    function (err){
        if(err){
            console.error("Erro", err.message);
            return res.status(500).json({
                success:false,
                message:"Failed to add medicine"
            });
        }
        res.json({
            success:true,
            message:"Medicine added successfully",
            medicine_id:this.lastID
        });
    }
);
});

//Medicine History
app.get("/history/user:id",(req,res)=>{
    const {user_id} = req.params;
    const sql = `
    SELECT * FROM medicines WHERE user_id = ?
    ORDER BY date DESC,time DESC`;
db.all(sql, [user_id], (err,rows)=>{
    if(err){
        console.error("History error: ",err.message);
        return res.status(500).json({
            success:false,
            message:"Failed to fetch medicine history"
        })
    }
    res.json({
        success:true,
        history:rows
    });
});
});

//view profile
app.get("/profile/:id",(req,res)=>{
    const {id} = req.params;
    const sql = `SELECT id,first_name,last_name, date_of_birth, address,email
    ,contact_number FROM users WHERE id=?`;

db.get(sql,[id],(err,row)=>{
    if(err){
        console.error("Error", err.message);
        return res.status(500).json({
            success:false,
            message: "Failed to fetch profile"
        });
    }
    if (!row){
        return res.json({
            success:false,
            message:"User not found"
        });
    }
    res.json({
        success:true,
        profile:row
    });
});
});

//Update profile
app.put("/profile/:id",(req,res)=>{
    const{id} = req.params;
    const {
        first_name,
        last_name,
        date_of_birth,
        address,
        email,
        contact_number
    }=req.body;
    const sql = `UPDATE users
    SET first_name = ?,
    last_name = ?,
    date_of_birth =?,
    address =?,
    email =?,
    contact_number =?
    WHERE id= ?
    `;
    db.run(
        sql,
        [first_name,last_name,date_of_birth,address,email,contact_number,id],
        function(err){
            if(err){
                console.error("Error", err.message);
                return res.status(500).json({
                    success:false,
                    message:"Failed to update profi;e"
                });
            }
            res.json({
                success:true,
                message:"Profile updated successfully",
                changes: this.changes
            });
        }
    );
});





app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});