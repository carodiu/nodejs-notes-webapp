import { getConnection, sql, queries } from '../database';

const notesController = {};

notesController.get = async() => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query(queries.getAllNotes);
     
        return result.recordset;    
       
    } catch (error) {
        return error;
    }
};

notesController.new = async (data) => {
    const { title, text, userId} = data;
    
    if ( title == null || text == null || userId==null )  
        return ({ msg: 'Bad request. Please, fill all fields' })

    try {
        const pool = await getConnection();
        
        const result = await pool.request()
            .input("title", sql.VarChar, title)
            .input("text", sql.VarChar, text)
            .input("userId", sql.Int, userId)
            .query(queries.insertNote);

        return ({ title, text, userId });
    } catch (error) {
        console.log(error);
        return (error);
    }

}

notesController.deleteById = async (data) => {
    const { id } = data;

    const pool = await getConnection();
    const result = await pool.request()
        .input("id", id)
        .query(queries.deleteNote);

    return result;
}

notesController.getById = async (data) => {
    const { id } = data;

    const pool = await getConnection();
    const result = await pool.request()
        .input("id", id)
        .query(queries.getNoteById);

    return (result.recordset);

};

notesController.getByUserId = async (data) => {
    const  userId  = data;

    const pool = await getConnection();
    const result = await pool.request()
        .input("userId", userId)
        .query(queries.getNotesByUserId);

    return (result.recordset);

};

notesController.update = async (idParam, data) => {

    const { title, text } = data;

    const { id } = idParam;

    if (id == null || title == null || text == null ) {
        return ({ msg: "Bad request. Please, Fill all fields." })
    }

    const pool = await getConnection();
    const result = await pool.request()
        .input("title", sql.VarChar, title)
        .input("text", sql.VarChar, text)  
        .input("id", sql.Int, id)
        .query(queries.updateNote);

    return({ title, text });

};


notesController.count = async (data) => {
    try {
        const  userId  = data;
        const pool = await getConnection();
        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .query(queries.getTotalNotesByUserId);

        return result.recordset[0][''];
    } catch (error) {
        console.log(error);
        return error;
    }
};






export { notesController as notes };



