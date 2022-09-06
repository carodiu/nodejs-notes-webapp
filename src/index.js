import app from './app'

import {getTestConnection} from './database/connection'

app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
});

