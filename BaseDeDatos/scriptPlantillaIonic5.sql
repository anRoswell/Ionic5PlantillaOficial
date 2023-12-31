USE [plantillaIonic]
GO
/****** Object:  Table [dbo].[access]    Script Date: 21/9/2020 14:00:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[access](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[profileId] [int] NOT NULL,
	[menuId] [int] NOT NULL,
	[create] [tinyint] NOT NULL,
	[update] [tinyint] NOT NULL,
	[delete] [tinyint] NOT NULL,
	[all] [tinyint] NOT NULL,
	[list] [tinyint] NOT NULL,
	[upload] [tinyint] NOT NULL,
	[admin] [tinyint] NOT NULL,
	[disabled] [tinyint] NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[identificationTypes]    Script Date: 21/9/2020 14:00:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[identificationTypes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [nvarchar](255) NOT NULL,
	[status] [bit] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[menus]    Script Date: 21/9/2020 14:00:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[menus](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](60) NOT NULL,
	[url] [varchar](120) NULL,
	[icon] [varchar](60) NULL,
	[menuId] [int] NULL,
	[order] [tinyint] NULL,
	[divider] [tinyint] NULL,
	[status] [tinyint] NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[profiles]    Script Date: 21/9/2020 14:00:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[profiles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [nvarchar](255) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 21/9/2020 14:00:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usrEmail] [nvarchar](255) NOT NULL,
	[usrPassword] [nvarchar](255) NOT NULL,
	[usrNames] [nvarchar](255) NOT NULL,
	[usrLastNames] [nvarchar](255) NOT NULL,
	[identificationTypeId] [int] NOT NULL,
	[usrCedula] [bigint] NOT NULL,
	[usrNroCelular] [nvarchar](255) NOT NULL,
	[usrTelefonoFijo] [nvarchar](255) NULL,
	[usrDireccion] [nvarchar](255) NULL,
	[usrStatus] [bit] NOT NULL,
	[usrOrigen] [int] NOT NULL,
	[lastLogin] [datetime] NOT NULL,
	[profileId] [int] NOT NULL,
	[usrTerminosCondiciones] [bit] NOT NULL,
	[lastDateLogin] [datetime] NOT NULL,
	[ip] [varchar](50) NULL,
	[operativeSystem] [varchar](50) NULL,
	[createdAt] [datetime] NOT NULL,
	[updatedAt] [datetime] NOT NULL,
 CONSTRAINT [PK__users__3213E83F6E222F9D] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[access] ON 

INSERT [dbo].[access] ([id], [profileId], [menuId], [create], [update], [delete], [all], [list], [upload], [admin], [disabled], [createdAt], [updatedAt]) VALUES (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, CAST(N'2020-09-14T12:48:00.000' AS DateTime), CAST(N'2020-09-14T12:48:00.000' AS DateTime))
INSERT [dbo].[access] ([id], [profileId], [menuId], [create], [update], [delete], [all], [list], [upload], [admin], [disabled], [createdAt], [updatedAt]) VALUES (2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, CAST(N'2020-09-14T12:48:00.000' AS DateTime), CAST(N'2020-09-14T12:48:00.000' AS DateTime))
INSERT [dbo].[access] ([id], [profileId], [menuId], [create], [update], [delete], [all], [list], [upload], [admin], [disabled], [createdAt], [updatedAt]) VALUES (3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, CAST(N'2020-09-14T12:48:00.000' AS DateTime), CAST(N'2020-09-14T12:48:00.000' AS DateTime))
INSERT [dbo].[access] ([id], [profileId], [menuId], [create], [update], [delete], [all], [list], [upload], [admin], [disabled], [createdAt], [updatedAt]) VALUES (4, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, CAST(N'2020-09-14T12:48:00.000' AS DateTime), CAST(N'2020-09-14T12:48:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[access] OFF
SET IDENTITY_INSERT [dbo].[identificationTypes] ON 

INSERT [dbo].[identificationTypes] ([id], [description], [status], [createdAt], [updatedAt]) VALUES (1, N'Cedula', 1, CAST(N'2020-06-12T00:00:00.0000000-05:00' AS DateTimeOffset), CAST(N'2020-06-12T00:00:00.0000000-05:00' AS DateTimeOffset))
SET IDENTITY_INSERT [dbo].[identificationTypes] OFF
SET IDENTITY_INSERT [dbo].[menus] ON 

INSERT [dbo].[menus] ([id], [name], [url], [icon], [menuId], [order], [divider], [status], [createdAt], [updatedAt]) VALUES (1, N'Configuraciones', N'#', N'icon icon-settings', NULL, 2, 0, 0, NULL, NULL)
INSERT [dbo].[menus] ([id], [name], [url], [icon], [menuId], [order], [divider], [status], [createdAt], [updatedAt]) VALUES (2, N'Usuarios', N'/admin/informes/usuarios', N'icon icon-users', 1, 1, 0, 0, NULL, NULL)
INSERT [dbo].[menus] ([id], [name], [url], [icon], [menuId], [order], [divider], [status], [createdAt], [updatedAt]) VALUES (3, N'Reportes', N'#', N'icon icon-settings', NULL, 3, 0, 0, NULL, NULL)
INSERT [dbo].[menus] ([id], [name], [url], [icon], [menuId], [order], [divider], [status], [createdAt], [updatedAt]) VALUES (4, N'Reporte 1', N'/admin/reporte/reporte1', N'icon icon-users', 3, 1, 0, 0, NULL, NULL)
SET IDENTITY_INSERT [dbo].[menus] OFF
SET IDENTITY_INSERT [dbo].[profiles] ON 

INSERT [dbo].[profiles] ([id], [name], [description], [createdAt], [updatedAt]) VALUES (1, N'admin', N'Administrador', CAST(N'2020-05-14T17:50:15.6733333+00:00' AS DateTimeOffset), CAST(N'2020-05-14T17:50:15.6733333+00:00' AS DateTimeOffset))
INSERT [dbo].[profiles] ([id], [name], [description], [createdAt], [updatedAt]) VALUES (2, N'Cedula', N'1', CAST(N'2020-06-12T00:00:00.0000000-05:00' AS DateTimeOffset), CAST(N'2020-06-12T00:00:00.0000000-05:00' AS DateTimeOffset))
INSERT [dbo].[profiles] ([id], [name], [description], [createdAt], [updatedAt]) VALUES (3, N'Extranjero', N'1', CAST(N'2020-06-12T00:00:00.0000000-05:00' AS DateTimeOffset), CAST(N'2020-06-12T00:00:00.0000000-05:00' AS DateTimeOffset))
INSERT [dbo].[profiles] ([id], [name], [description], [createdAt], [updatedAt]) VALUES (4, N'Pasaporte', N'1', CAST(N'2020-06-12T00:00:00.0000000-05:00' AS DateTimeOffset), CAST(N'2020-06-12T00:00:00.0000000-05:00' AS DateTimeOffset))
SET IDENTITY_INSERT [dbo].[profiles] OFF
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id], [usrEmail], [usrPassword], [usrNames], [usrLastNames], [identificationTypeId], [usrCedula], [usrNroCelular], [usrTelefonoFijo], [usrDireccion], [usrStatus], [usrOrigen], [lastLogin], [profileId], [usrTerminosCondiciones], [lastDateLogin], [ip], [operativeSystem], [createdAt], [updatedAt]) VALUES (1, N'alfonso.navarro@syspotec.com', N'$2b$10$VbZPqEaoT6greDKpDNyR2.4OSc1ddB1VbyqgXH2x46Wg1S6fzAh8W', N'Admin', N'Istrador', 1, 104738100412, N'311123456', N'', N'Syspotec.com', 1, 1, CAST(N'2020-09-15T16:38:28.057' AS DateTime), 1, 1, CAST(N'2020-09-14T17:36:33.890' AS DateTime), NULL, NULL, CAST(N'2020-08-28T10:11:15.403' AS DateTime), CAST(N'2020-09-15T19:43:46.040' AS DateTime))
INSERT [dbo].[users] ([id], [usrEmail], [usrPassword], [usrNames], [usrLastNames], [identificationTypeId], [usrCedula], [usrNroCelular], [usrTelefonoFijo], [usrDireccion], [usrStatus], [usrOrigen], [lastLogin], [profileId], [usrTerminosCondiciones], [lastDateLogin], [ip], [operativeSystem], [createdAt], [updatedAt]) VALUES (3, N'anroswell@gmail.com', N'$2b$10$SXF0/OK5fRwpiSUt/WufNOSx3HF6RV3ybsYoHES3cOnoIh8XZPFK2', N'Alfonso ', N'Navarro', 1, 73197546, N'3117051171', N'', N'Barrio perdomo', 1, 1, CAST(N'2020-09-21T13:47:52.767' AS DateTime), 1, 1, CAST(N'2020-09-15T23:40:52.243' AS DateTime), NULL, NULL, CAST(N'2020-09-15T23:40:52.243' AS DateTime), CAST(N'2020-09-16T11:16:27.180' AS DateTime))
SET IDENTITY_INSERT [dbo].[users] OFF
ALTER TABLE [dbo].[access] ADD  DEFAULT ('0') FOR [disabled]
GO
ALTER TABLE [dbo].[access] ADD  DEFAULT (NULL) FOR [createdAt]
GO
ALTER TABLE [dbo].[access] ADD  DEFAULT (NULL) FOR [updatedAt]
GO
ALTER TABLE [dbo].[identificationTypes] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[menus] ADD  DEFAULT ('#') FOR [url]
GO
ALTER TABLE [dbo].[menus] ADD  DEFAULT (NULL) FOR [icon]
GO
ALTER TABLE [dbo].[menus] ADD  DEFAULT (NULL) FOR [menuId]
GO
ALTER TABLE [dbo].[menus] ADD  DEFAULT ('0') FOR [order]
GO
ALTER TABLE [dbo].[menus] ADD  DEFAULT ('0') FOR [divider]
GO
ALTER TABLE [dbo].[menus] ADD  DEFAULT ('0') FOR [status]
GO
ALTER TABLE [dbo].[menus] ADD  DEFAULT (NULL) FOR [createdAt]
GO
ALTER TABLE [dbo].[menus] ADD  DEFAULT (NULL) FOR [updatedAt]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF_users_usrStatus]  DEFAULT ((1)) FOR [usrStatus]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF_users_usrOrigen]  DEFAULT ((1)) FOR [usrOrigen]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF_users_profileId]  DEFAULT ((1)) FOR [profileId]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF_users_lastDateLogin]  DEFAULT (getdate()) FOR [lastDateLogin]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF_users_createdAt]  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF_users_updatedAt]  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[access]  WITH CHECK ADD  CONSTRAINT [FK_access_menus] FOREIGN KEY([menuId])
REFERENCES [dbo].[menus] ([id])
GO
ALTER TABLE [dbo].[access] CHECK CONSTRAINT [FK_access_menus]
GO
ALTER TABLE [dbo].[access]  WITH CHECK ADD  CONSTRAINT [FK_access_profiles] FOREIGN KEY([profileId])
REFERENCES [dbo].[profiles] ([id])
GO
ALTER TABLE [dbo].[access] CHECK CONSTRAINT [FK_access_profiles]
GO
ALTER TABLE [dbo].[menus]  WITH CHECK ADD  CONSTRAINT [FK_menus_menus] FOREIGN KEY([menuId])
REFERENCES [dbo].[menus] ([id])
GO
ALTER TABLE [dbo].[menus] CHECK CONSTRAINT [FK_menus_menus]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK__users__identific__3D5E1FD2] FOREIGN KEY([identificationTypeId])
REFERENCES [dbo].[identificationTypes] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK__users__identific__3D5E1FD2]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK__users__profileId__3E52440B] FOREIGN KEY([profileId])
REFERENCES [dbo].[profiles] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK__users__profileId__3E52440B]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'numero de documento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'users', @level2type=N'COLUMN',@level2name=N'usrCedula'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Indica si el usuario se registro en la appMobile, web o dashBoard.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'users', @level2type=N'COLUMN',@level2name=N'usrOrigen'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ip de origen' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'users', @level2type=N'COLUMN',@level2name=N'ip'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Navegador de origen' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'users', @level2type=N'COLUMN',@level2name=N'operativeSystem'
GO
