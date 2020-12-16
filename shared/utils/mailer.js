const nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9cd5fde3c141a7",
      pass: "a7b4562ca898b5"
    }
  });


const sendEmail=(from,to,emailProps)=>{
    if(!emailProps.text && !emailProps.html) 
        return Promise.reject('Paramètres invalide, spécifiez au moins un des deux : text/html')
    const message = {
        from: from,
        to: to,
        subject: emailProps.subject || "",
        ...emailProps
       
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        return Promise.reject("Une erreur s'est produite, impossible d'envoyer l'email. \n "+err)

        } else {
          console.log(info);
          return Promise.resolve({ok: true, message: 'Email envoyé avec succès'})
        }
    });

}  

module.exports=sendEmail