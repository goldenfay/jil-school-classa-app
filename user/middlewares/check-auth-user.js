// const jwt = require("jsonwebtoken");
// const Client = require("../models/client");
// const Eleve = require("../models/eleve");
// module.exports = async (req, res, next) => {
//   if (req.method === "OPTIONS") return next();
//   try {
//     const token = req.headers.authorization.split(" ")[1];

//     if (!token) {
//       throw Error("Token Not Found!");
//     }
//     const decodedToken = await jwt.verify(
//       token,
//       process.env.USER_SECRET || "user_secret"
//     );

//     let userData = {};
//     let client;

//     client = await Client.findById(decodedToken.id).select(
//       "-username -password"
//     );
//     if (!client) {
//       return res.status(403).json({
//         message: "Client Introuvable!, Accés non authorisé!",
//         is_connecte: false,
//       });
//     }
//     userData.client = client;
//     if (client.is_abonne) {
//       const userType= req.method==="GET"?req.headers.usertype: req.body.userType
//       if ( userType=== "eleve") {
//         let eleve;
//         const { eleveId } = req.body;
//         const isValidEleve = await Client.findOne({
//           eleves: {
//             $elemMatch: { _id: eleveId },
//           },
//         });

//         if (!isValidEleve) {
//           return res.status(403).json({
//             message: "Vous n'avez pas le droit d'effectuer cette opératione",
//             is_connecte: false,
//           });
//         }
//         eleve = await Eleve.findById(eleveId);
//         if (!eleve) {
//           return res.status(403).json({
//             message: "Vous n'avez pas le droit d'effectuer cette opération",
//             is_connecte: false,
//           });
//         }
//         userData.eleve = eleve;
//       }

//       let isConnection;
//       isConnection = await Client.findOne({
//         connections: decodedToken.connectionId,
//       });

//       if (!isConnection) {
//         throw Error("Echec d'authentification");
//       }
//     }

//     req.userData = {
//       ...req.userData,
//       ...userData,
//     };
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(403).json({
//       message:
//         "Une Erreur s'est produite, Echec d'authentification. Veuillez réessayer ulterieurement",
//       is_connecte: false,
//     });
//   }
// };
const jwt = require("jsonwebtoken");
const Client = require("../models/client");
const Eleve = require("../models/eleve");
module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw Error("Token Not Found!");
    }
    const decodedToken = await jwt.verify(
      token,
      process.env.USER_SECRET || "user_secret"
    );

    let userData = {};
    let client, eleve;

    const userType =
      req.method === "GET" ? req.headers.usertype : req.body.userType;
    if (userType === "eleve") {
      const { eleveId } = decodedToken;
      eleve = await Eleve.findById(eleveId);
      if (!eleve) {
        return res.status(403).json({
          message: "Vous n'avez pas le droit d'effectuer cette opération",
          is_connecte: false,
        });
      }
      const isValidEleve = await Client.findById(eleve.client).select("-username -password");

      if (!isValidEleve) {
        return res.status(403).json({
          message: "Vous n'avez pas le droit d'effectuer cette opératione",
          is_connecte: false,
        });
      }
      userData.eleve = eleve;
      userData.client = isValidEleve;
    }else if(userType === "client"){
      client = await Client.findById(decodedToken.id).select(
        "-username -password"
      );
      if (!client) {
        return res.status(403).json({
          message: "Client Introuvable!, Accés non authorisé!",
          is_connecte: false,
        });
      }
      userData.client = client;

    }else {
      return res.status(403).json({
        message: "Vous n'avez pas le droit d'effectuer cette opération",
        is_connecte: false,
      });

    }


    req.userData = {
      ...req.userData,
      ...userData,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message:
        "Une Erreur s'est produite, Echec d'authentification. Veuillez réessayer ulterieurement",
      is_connecte: false,
    });
  }
};
