const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));
const port = 4000;
let user_id = 0;
let organization_id = 0;
const Secrate_key = "jitchangdar@#4352323my-app/zetllle#$"
const userinfo = [];
const organization = [];
const bords = [];
const issue = [];

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "signup.html"));

})
app.get("/organization-create", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "organization.html"))
})
app.get("/create-member", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "create-member.html"))
})

app.get("/board", (req, res) => {
})

app.post('/signup_post', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const check_user = userinfo.find(item => item.email === email);
    if (check_user) {
        res.status(400).json({
            message: "User already exists",
        })
    }


    const user_name_token = jwt.sign(
        { email },
        Secrate_key
    )

    user_id++;
    userinfo.push({ user_id, username, password, email });

    res.json({
        message: "User is Create Successfully",
        token: user_name_token
    })

})


app.post('/get-orgization-username', (req, res) => {
    const token_name = req.headers.token;

    if (!token_name) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decode = jwt.verify(token_name, Secrate_key);

        const user = userinfo.find(
            item => item.email === decode.email
        );

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        res.json({ username: user.username });

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
});



app.post("/add-create-create-org", (req, res) => {

    const org_name = req.body.orgname;
    const decription = req.body.description;
    const token = req.body.token;

    try {
        const find_user = jwt.verify(token, Secrate_key);

        if (!find_user) {
            res.status(401).json({
                message: "you are not valid user"
            })
        }

        const verify_id = userinfo.find(item => item.email == find_user.email);

        const user_id = verify_id.user_id;

        organization_id++;

        organization.push({ user_id, organization_id, org_name, decription });


        res.json({
            message: "Organization create successfully"
        })

    }
    catch (err) {
        return res.status(401).json({
            message: "invalid or expired token"
        });
    }


})


app.post("/signin", (req, res) => {

})


app.post("/get-all-org", (req, res) => {
   const token_user = req.body.user_token;

   const verify_token = jwt.verify(token_user,Secrate_key);

   console.log(verify_token);
})

app.post("/add-create-member", (req, res) => {

})


app.post("/issue", (req, res) => {

})



app.post("/delete", (req, res) => {

})

app.listen(port, () => {
    console.log("server is running");
})
