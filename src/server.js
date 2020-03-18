const config = require('config');

const app = require('./app');

const PORT = config.get('PORT') || 7000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
