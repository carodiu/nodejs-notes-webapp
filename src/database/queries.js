export const queries = {
    getAllNotes:"select id, title, text, userId, CONVERT(VARCHAR, createdAt, 121) as createdAt from note",
    insertNote:"INSERT INTO Note (title,text, userId) VALUES (@title,@text,@userId)",
    getNotesByUserId:"Select * from Note where userId = @userId",
    getNoteById:"Select * from Note where id = @id",
    deleteNote:"Delete Note where id = @id",
    getTotalNotesByUserId:"Select count(*) from Note where userId = @userId",
    updateNote:"update dbo.Note set title = @title, text=@text where id = @id",
    userInsert:"exec spUserInsert @username, @password, @fullname",
    userGetById:"exec spUserGetById @id",
    userGetByUsername:"exec spUserGetByUsername @username"
}
