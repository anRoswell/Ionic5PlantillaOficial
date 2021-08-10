// TODO: Pasar la estructura del html a una funcionalidad independiente

const nodemailer = require('nodemailer')
const { email } = require('../../config/')

module.exports = {
	sendEmail: async (data) => {
		const codVerificacion = new Date().getMilliseconds()
		const transporter = nodemailer.createTransport(email)
		const resultado = await transporter.sendMail({
			from: `"Empresa Prueba" <alfonso.navarro@syspotec.com>`,
			to: data.usrEmail,
			subject: `Validar email registro Aseo Capital Panamá mobile : ${data.usrNames} ${data.usrLastNames}`,
			text: 'Por favor registrar este codigo en la App para validar su correo electronico',
			html: ` <p>Esta en un proceso de registro en la AppToolKitPanama, por favor ingrese el sgte codigo de verificacion en la app:</p>
                <table style="width: 80%; border-collapse: collapse;">
                    <tbody>
                      <tr style="border: 3px solid #dedede;">
                        <td>Nombres y apellidos:</td>
                        <td><b>${data.usrNames} ${data.usrLastNames}</b></td>
                      </tr>
                      <tr style="border: 3px solid #dedede;">
                        <td>Codigo:</td>
                        <td><b>${codVerificacion}</b></td>
                      </tr>
                  </tbody>
                </table>
              `,
		})
		console.log(resultado)
		return { codVerificacion }
	},
	recoverypass: async (data) => {
		const codVerificacion = new Date().getMilliseconds()
		let transporter = nodemailer.createTransport(email)
		await transporter.sendMail({
			from: `"Empresa Prueba" <alfonso.navarro@syspotec.com>`,
			to: data.usrEmail,
			subject: `Código de recuperación de tu cuenta AppToolKit`,
			text: 'Por favor registrar este codigo en la App para validar su correo electronico',
			html: `
			<div style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
				<table border="0" cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse">
					<tbody>
						<tr>
							<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
								<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
									<tbody>
										<tr>
											<td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
										</tr>
										<tr>
											<td height="1" colspan="3" style="line-height:1px">
												<span style="color:#ffffff;font-size:1px">&nbsp; Hola, ${data.usrNames} ${data.usrLastNames}: Recibimos una solicitud para restablecer tu contraseña de AppToolKit. Ingresa el siguiente código para restablecer la contraseña: ${codVerificacion} También puedes cambiar la contraseña directamente. &nbsp; Cambiar&nbsp;contraseña &nbsp; ¿No solicitaste este cambio? Si no solicitaste una nueva contraseña, avísanos . &nbsp;
												</span>
											</td>
										</tr>
										<tr>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
											<td>
											<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
												<tbody>
													<tr>
														<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
													</tr>
													<tr>
														<td width="32" align="left" valign="middle" style="height:32;line-height:0px">
															<img src="https://suitsys.syspotec.co/Content/IconosApps/logo-sys.png" width="45" height="32" style="border:0" class="CToWUd">
														</td>
														<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
														<td width="100%">
															<span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:19px;line-height:32px;color:#3b5998">AppToolKit
															</span>
														</td>
													</tr>
													<tr style="border-bottom:solid 1px #e5e5e5">
														<td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
													</tr>
												</tbody>
											</table>
											</td>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
										</tr>
										<tr>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
											<td>
											<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
												<tbody>
													<tr>
														<td height="28" style="line-height:28px">&nbsp;</td>
													</tr>
													<tr>
														<td>
														<span class="m_-7615546015233511716mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
															<p>Hola, ${data.usrNames} ${data.usrLastNames}:</p>
															<p></p>
															<div>Recibimos una solicitud para restablecer tu contraseña de AppToolKit.</div>
															Ingresa el siguiente código para restablecer la contraseña:
															<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:9px;margin-bottom:15px">
																<tbody>
																	<tr>
																	<td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc"><span class="m_-7615546015233511716mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">${codVerificacion}</span></td>
																	</tr>
																</tbody>
															</table>
															<p></p>
															También puedes cambiar la contraseña directamente.
															<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
																<tbody>
																	<tr>
																		<td height="9" style="line-height:9px" colspan="3">&nbsp;</td>
																	</tr>
																	<tr>
																		<td>
																			<a href="" style="color:#3b5998;text-decoration:none" target="_blank" >
																				<table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
																					<tbody>
																						<tr>
																							<td style="border-collapse:collapse;border-radius:2px;text-align:center;display:block;border:solid 1px #344c80;background:#333333;padding:7px 16px 11px 16px">
																								<a href="" style="color:#3b5998;text-decoration:none;display:block" target="_blank" >
																									<center>
																										<font size="3">
																											<span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;white-space:nowrap;font-weight:bold;vertical-align:middle;color:#ffffff;font-size:14px;line-height:14px">Cambiar&nbsp;contraseña
																											</span>
																										</font>
																									</center>
																								</a>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</a>
																		</td>
																		<td width="100%"></td>
																	</tr>
																	<tr>
																	<td height="32" style="line-height:32px" colspan="3">&nbsp;</td>
																	</tr>
																</tbody>
															</table>
															<br>
															<div>
																<span style="color:#333333;font-weight:bold">¿No solicitaste este cambio?</span>
															</div>
															Si no solicitaste una nueva contraseña, <a href="" style="color:#3b5998;text-decoration:none" target="_blank" ">avísanos</a>.
														</span>
														</td>
													</tr>
													<tr>
														<td height="28" style="line-height:28px">&nbsp;</td>
													</tr>
												</tbody>
											</table>
											</td>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
										</tr>
										<tr>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
											<td>
											<table border="0" width="100%" cellspacing="0" cellpadding="0" align="left" style="border-collapse:collapse">
												<tbody>
													<tr style="border-top:solid 1px #e5e5e5">
														<td height="19" style="line-height:19px">&nbsp;</td>
													</tr>
													<tr>
														<td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">Este mensaje se envió a <a href="mailto:${data.usr_email}" style="color:#3b5998;text-decoration:none" target="_blank">${data.usrEmail}</a>.<br>Syspotec S.A.S, Carrera 15 No. 88 - 64 Torre Zimma
														</td>
													</tr>
												</tbody>
											</table>
											</td>
											<td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
										</tr>
										<tr>
											<td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
										</tr>
									</tbody>
								</table>
								<span>
									<img src="https://ci4.googleusercontent.com/proxy/SiK8VDnWaFNj2PnsZf3Z9lw3hNQKl0VexSxBubxrQDKpkVhdgg7zJYnN3CO6yoNV7wFjEAQKW9L2qJcZYPSLXwdh6EXqil8NLrgD7eC97o0aCL2fPFUBNvL7s1cKfknfgDCm-TmMvkUy7ieq4yJB=s0-d-e1-ft#https://www.facebook.com/email_open_log_pic.php?mid=5a6928bb979f8G4018348bG5a692d54f7ccaG178" style="border:0;width:1px;height:1px" class="CToWUd">
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
            `,
		})
		const completeName = `${data.usrNames} ${data.usrLastNames}`
		return {
			codVerificacion,
			completeName: completeName,
			id: data.id,
			email: data.usrEmail,
		}
	},
}
