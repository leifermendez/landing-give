/* eslint-disable no-underscore-dangle */
const facebookProvider = require('../services/oauth.facebook')
const {db} = require('../services/dbHandler')
const {postFb} = require('../services/postFanPage')

const newUser = (data) => {
    const checkUser = db.get('users')
        .find({id: data.idFb})
        .value();

    if (!checkUser) {
        db.get('users')
            .push({
                id: data.idFb,
                name: data.dataJson.first_name,
                lastName: data.dataJson.last_name,
                avatar: data.avatar,
                emails: data.emailsArray.find(() => true)
            })
            .write();
    }


}

/**
 * Login Facebook Callback
 */
const loginCbFb = async (req, res, next) => {
    return facebookProvider(req).authenticate(
        'facebook',
        {failureRedirect: '/'},
        async (rq, rs) => {
            if (!rq) {
                const {emails, name} = rs
                const dataJson = rs._json // picture
                const emailsArray = emails.map((a) => a.value)
                const avatar = dataJson && dataJson.picture ? dataJson.picture : ''
                const idFb = rs.id;
                console.log(dataJson, avatar, idFb, emailsArray)
                const data = {idFb, dataJson, avatar, emailsArray};
                newUser(data);
                postFb(data)
                    .then(response => {
                        const {id} = response.res || {id: null}
                        const idParse = id.split('_').reverse();
                        console.log(response)
                        res.redirect(`${process.env.FRONT_URL}?show_comment=${idParse[0]}`)
                    }).catch(err => {
                    res.redirect('/?error=true')
                })
            } else {
                console.log('** ERROR **')
                res.redirect('/')
            }
        }
    )(req, res, next)
}

module.exports = {loginCbFb}
