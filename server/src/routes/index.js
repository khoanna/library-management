const loginRouter = require('./login')
const logoutRouter = require('./logout')
const dashboardRouter = require('./dashboard')
const docgiaRouter = require('./docgia')
const phieumuonRouter = require('./phieumuon')
const phieuphatRouter = require('./phieuphat')
const sachRouter = require('./sach')
const tacgiaRouter = require('./tacgia')
const nhanvienRouter = require('./nhanvien')

function route(app) {
    // [/login]
    app.use('/login', loginRouter)
    // [/logout]
    app.use('/logout', logoutRouter)
    // [/dashboard]
    app.use('/dashboard', dashboardRouter)
    // [/docgia]
    app.use('/docgia', docgiaRouter)
    // [/phieumuon]
    app.use('/phieumuon', phieumuonRouter)
    // [/phieuphat]
    app.use('/phieuphat', phieuphatRouter)
    // [/sach]
    app.use('/sach', sachRouter)
    // [/tacgia]
    app.use('/tacgia', tacgiaRouter)
    // [/nhanvien]
    app.use('/nhanvien', nhanvienRouter)
}

module.exports = route;