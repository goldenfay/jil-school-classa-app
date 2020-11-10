import {rows as fakeProfs} from './fakeProfs'
import {customersRows as fakeClients} from './fakeCustomers'
import fakeClasses from './fakeClasses'
// import fakeMatieres from './fakeMatieres'
import fakeMatieres from './fakeMatieres2'
import fakeCours from './fakeCours'

// Set fake Manager and teachers database
const admins=fakeProfs.map((row)=>({
    ...row,
    username: `${row.prenom}_${row.id}`,
    password: `password_${row.id}`,
    avatar: ''
    // classes: [row.classes]
}))
admins[0].adminType='manager'


if(localStorage.getItem('admins')===null)localStorage.setItem('admins', JSON.stringify(admins))
if(localStorage.getItem('clients')===null)localStorage.setItem('clients', JSON.stringify(fakeClients))
if(localStorage.getItem('eleves')===null)localStorage.setItem('eleves', JSON.stringify(fakeProfs))
if(localStorage.getItem('classes')===null)localStorage.setItem('classes', JSON.stringify(fakeClasses))
if(localStorage.getItem('matieres')===null)localStorage.setItem('matieres', JSON.stringify(fakeMatieres))
// localStorage.setItem('cours', JSON.stringify(fakeCours))

let adminsDB = JSON.parse(localStorage.getItem('admins')) || []
let clientsDB = JSON.parse(localStorage.getItem('clients')) || []
let elevesDB = JSON.parse(localStorage.getItem('eleves')) || []
let classesDB = JSON.parse(localStorage.getItem('classes')) || []
let matieresDB = JSON.parse(localStorage.getItem('matieres')) || []
let coursDB = JSON.parse(localStorage.getItem('cours')) || []

export function configureFakeBackend () {
  let realFetch = window.fetch
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // Simulate API Call
      setTimeout(() => {
        // authenticate
        if (url.endsWith('/api/admin/signin') && opts.method === 'POST') {
          // get parameters from post request
          let params = JSON.parse(opts.body)

          // find if any user matches login credentials
          let filteredUsers = adminsDB.filter(user => {
            return user.username === params.username && user.password === params.password && user.adminType===params.adminType
          })

          if (filteredUsers.length) {
            // if login details are valid return user details and fake jwt token
            let user = filteredUsers[0];
            let {id,username,nom,prenom,commune,wilaya,matiere,dataAjout,classesIds,email,phone}=user;
            let responseJson = {
              admin:{id,username,nom,prenom,commune,wilaya,matiere,dataAjout,classesIds,email,phone},
              token: 'fake-jwt-token'
            }
           
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) })
          } else {
            // else return error
            reject("Nom d'utilisateur ou mot de passe incorrecte.")
          }

          return
        }
        // update manager
        if (url.match(/\/api\/admin\/\d+$/) && opts.method === 'PUT') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = url.split('/')
            let id = parseInt(urlParts[urlParts.length - 1])
            let updates = JSON.parse(opts.body);
            for (let i = 0; i < adminsDB.length; i++) {
              let user = adminsDB[i]
              if (user.id === id) {
                // delete user
                adminsDB[i]={
                  ...adminsDB[i],
                  ...updates

                }
                localStorage.setItem('admins', JSON.stringify(adminsDB))
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(adminsDB[i])) })
              }
            }
            
          } else {
            // return 401 not authorised if token is null or invalid
            reject('Unauthorised')
          }
          
          return
        }
        /*************************************************************/
        /*****************************PROFS *****************************/
        /*************************************************************/

        // get profs
        if (url.endsWith('/api/admin/enseignants') && opts.method === 'GET') {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(adminsDB))})
          } else {
            // return 401 not authorised if token is null or invalid
            reject('Unauthorised')
          }

          return
        }
        
        // get prof by id
        if (url.match(/\/admin\/enseignants\/\d+$/) && opts.method === 'GET') {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = url.split('/')
            let id = parseInt(urlParts[urlParts.length - 1])
            let matchedUsers = adminsDB.filter(user => { return user.id === id })
            let user = matchedUsers.length ? matchedUsers[0] : null

            // respond 200 OK with user
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(user))})
          } else {
            // return 401 not authorised if token is null or invalid
            reject('Unauthorised')
          }
          
          return
        }

        // register prof
        if (url.endsWith('/enseignants/new') && opts.method === 'POST') {
          // get new user object from post body
          let newUser = JSON.parse(opts.body)

          // validation
          let duplicateUser = adminsDB.filter(user => { return user.username === newUser.username }).length
          if (duplicateUser) {
            reject('Username "' + newUser.username + '" is already taken')
            return
          }
          
          newUser.id = adminsDB.length ? Math.max(...adminsDB.map(user => user.id)) + 1 : 1
          adminsDB.push(newUser)
          localStorage.setItem('admins', JSON.stringify(adminsDB))
          
          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() })
          
          return
        }
        
        // delete prof
        if (url.match(/\/enseignants\/\d+$/) && opts.method === 'DELETE') {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = url.split('/')
            let id = parseInt(urlParts[urlParts.length - 1])
            for (let i = 0; i < adminsDB.length; i++) {
              let user = adminsDB[i]
              if (user.id === id) {
                // delete user
                adminsDB.splice(i, 1)
                localStorage.setItem('users', JSON.stringify(adminsDB))
                break
              }
            }
            
            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() })
          } else {
            // return 401 not authorised if token is null or invalid
            reject('Unauthorised')
          }
          
          return
        }
        /*************************************************************/
        /*****************************Abonnes *****************************/
        /*************************************************************/
        
        // get abonnes
        if (url.endsWith('/clients') && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(clientsDB))})
          } else {
            reject('Unauthorised')
          }

          return
        }

        /*************************************************************/
        /*****************************Eleves *****************************/
        /*************************************************************/
        // get eleves
        if (url.endsWith('/eleves') && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(elevesDB))})
          } else {
            reject('Unauthorised')
          }

          return
        }
        // get classes
        if (url.endsWith('/classes') && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
           
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(classesDB))})
          } else {
            reject('Unauthorised')
          }

          return
        }
        // get classes with matieres
        if (url.endsWith('/classesMatieres') && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            const res={
              classes: classesDB,
              matieres: matieresDB
            }
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(res))})
          } else {
            reject('Unauthorised')
          }

          return
        }
        /*************************************************************/
        /*****************************COURS *****************************/
        /*************************************************************/


        // get cours
        if (url.endsWith('/api/user/cours') && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(coursDB))})
          } else {
            reject('Unauthorised')
          }

          return
        }
        // get a course of a prof
        if (url.match(/\/cours\/enseignants\/\d+$/) && opts.method === 'GET') {
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            let urlParts = url.split('/')
            let id = parseInt(urlParts[urlParts.length - 1])
            let prof = adminsDB.filter(admin => { return admin.adminType==="enseignant" && admin.id === id }).length;

            if(!prof) reject('Enseignant non trouvé')

            let profCourses=coursDB.filter((course)=> course.ajoutePar===id)
            
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(profCourses))})
          } else {
            reject('Unauthorised')
          }

          return
        }

        // register new course
        if (url.endsWith('/cours/new') && opts.method === 'POST') {
          // get new user object from post body
          let newCourse = JSON.parse(opts.body)

          // validation
          let duplicateCourse = coursDB.filter(course => { return course.titre === newCourse.titre }).length
          if (duplicateCourse) {
            reject('Le cours intitulé "' + newCourse.titre + '" existe déja')
            return
          }
          let coursePoster = newCourse.ajoutePar;

          let poster = adminsDB.filter(admin => { return admin.adminType==="enseignant" && admin.id === coursePoster }).length
          if (!poster) {
            reject('Enseignant non trouvé ')
            return
          }
          
          newCourse.id = coursDB.length ? Math.max(...coursDB.map(user => user.id)) + 1 : 1
          const {id,titre, thumbnail, lien,titrePdf,pdfFile,questionsList,ajoutePar}=newCourse
          coursDB.push({id,titre, thumbnail, lien,titrePdf,pdfFile,questionsList,ajoutePar})
          localStorage.setItem('cours', JSON.stringify(coursDB))
          
          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() })
          
          return
        }

        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response))
      }, 1000)
    })
  }
}
