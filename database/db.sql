Create Database notes;

use notes
go

CREATE TABLE [dbo].[Note](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](150) NOT NULL,
	[text] [varchar](1000) NOT NULL,
	[userId] [int] NOT NULL,
	[createdAt] [datetime] NOT NULL,
 CONSTRAINT [PK_Note] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Sessions](
	[sid] [nvarchar](255) NOT NULL,
	[session] [nvarchar](max) NOT NULL,
	[expires] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[sid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](20) NOT NULL,
	[password] [varchar](100) NOT NULL,
	[fullname] [varchar](100) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_Unique_User] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Note] ADD  CONSTRAINT [DF_Note_createdAt]  DEFAULT (CONVERT([datetime2](0),getdate(),0)) FOR [createdAt]
GO
ALTER TABLE [dbo].[Note]  WITH NOCHECK ADD  CONSTRAINT [FK_Note_User] FOREIGN KEY([id])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Note] NOCHECK CONSTRAINT [FK_Note_User]
GO

create procedure [dbo].[spUserGetById]
@id int
as
	    Select * from [dbo].[user] 
		where id= @id;	

GO

create procedure [dbo].[spUserGetByUsername]
@username varchar(20)
as
	    Select * from [dbo].[user] 
		where username= @username;	

GO

create procedure [dbo].[spUserInsert]
@username varchar(20),
@password varchar(100),
@fullname varchar(100)
as
	    insert into [dbo].[user] (username,password,fullname) 
		values (@username, @password, @fullname);
		
		SELECT SCOPE_IDENTITY() AS id;

GO

