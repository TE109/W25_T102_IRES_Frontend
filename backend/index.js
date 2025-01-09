const CFG = require("./config/config");
const app = require("./config/app");

require('dotenv').config();

// Basic route for testing
app.get('/', (req, res) => {
    res.send('IRes Backend is Running!');
});

// Start the server
app.listen(CFG.PORT, () => {
    console.log(`Server is running on http://localhost:${CFG.PORT}`);
});
