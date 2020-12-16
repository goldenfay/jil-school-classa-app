const HttpError = require("../../shared/models/http-error");
const bcrypt = require("bcryptjs");
const rejectPropsObject = require("../../shared/utils/reject-props-object");
module.exports = async (req, res, next) => {
  const { admin, id } = req.adminData;
  if (id !== req.params.id)
    return next(
      new HttpError("Vous n'avez pas le droit pour faire cette opération")
    );

  const {
    username,
    oldPassword,
    newPassword,
    email,
    nom,
    prenom,
    wilaya,
    commune,
    phone,
  } = req.body;
  const attrChanged=[];
  let image;
  if(req.file){
    image=`${req.file.destination}/${req.file.filename}`;
  }
  
  // shared
  if (nom) {admin.nom = nom; attrChanged.push('nom')}
  if (prenom) {admin.prenom = prenom; attrChanged.push('prenom')}
  if (phone) {admin.phone = phone; attrChanged.push('phone')}
  if (email) {admin.email = email; attrChanged.push('email')}
  if (image) {admin.image = image; attrChanged.push('image')}

  if (oldPassword && newPassword) {
    let hashPassword;
    try {
      const isValidPassword = await bcrypt.compare(oldPassword, admin.password);
      if (!isValidPassword)
        return next(new HttpError("Mot de passe Icorrect", 422));
      hashPassword = await bcrypt.hash(
        newPassword,
        process.env.HASH_SALT || 12
      );
      admin.password = hashPassword;
      attrChanged.push('password')
    } catch (error) {
      console.log('Error when updating the manager password ',error)
      return next(
        new HttpError(
          "Une Erreur s'est produite, veuillez réessayer ulterieurement",
          500
        )
      );
    }
  }

  // Teacher
  if (wilaya) {admin.wilaya = wilaya; attrChanged.push('wilaya')}
  if (commune) {admin.commune = commune; attrChanged.push('commune')}

  // Manager
  if (username) {
    if (username === admin.username) {
      return next(
        new HttpError(
          "Username existe déjà veuillez choisir un autre username",
          422
        )
      );
    }
    admin.username = username;
    attrChanged.push('username')
  }
  let savedAdmin;
  try {
    savedAdmin= await admin.save();
  } catch (error) {
    console.log('Error when updating the manager row ',error)
    return next(
      new HttpError(
        "Une Erreur s'est produite, veuillez réessayer ulterieurement",
        500
      )
    );
  }
  const SERVER_ENV = JSON.parse(process.env["SERVER"]);
  const adminObj=savedAdmin.toObject({getters: true })
  const response=adminObj;
  const changes=Object.assign(
    {},
    ...attrChanged.map((key,index) => {
      
        return ({
            [key]: adminObj[key],
          })}
          )
  );

  if(changes.image) response.image=response.image.replace(
    /^uploads/,
    `${SERVER_ENV.address}:${SERVER_ENV.port}`
  );
  res.status(200).json(rejectPropsObject(response,['password']));
};
