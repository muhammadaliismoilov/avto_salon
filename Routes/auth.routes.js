const Router = require("express")
const {register, verify, login, forgotPassword, changePassword, logout} = require("../Controller/auth.controller")
const validatorUser = require("../Middleware/user.middleware")
const { refreshTokenMiddleware } = require("../Middleware/refreshtoken.middleware")


const authRouter = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Foydalanuvchini ro'yxatdan o'tkazish
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvoffaqiyatli ro'yxatdan o'tdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Siz roydatdan muvoffaqiyatli otdingiz va code johndoe@example.com ga yuborildi
 *       409:
 *         description: Email allaqachon ro'yxatdan o'tgan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Siz ro`yxatdan o`tgansiz! Login orqali kiring
 *       500:
 *         description: Server xatosi yoki email yuborishda muammo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email yuborishda xatolik yuz berdi!
 */
authRouter.post("/register",validatorUser,register)

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Elektron pochtani tasdiqlash (verify)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               code:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Email muvoffaqiyatli tasdiqlandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Elektron pochtangizni tasdiqladingiz!
 *       400:
 *         description: Noto‘g‘ri ma’lumotlar yuborildi yoki vaqt tugagan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vaqt tugagan!
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi
 *       500:
 *         description: Tasdiqlashda server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Verifyni tasdiqlashda xatolik!!!
 */
authRouter.post("/verify",verify)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Foydalanuvchini tizimga kiritish (login)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Tizimga muvaffaqiyatli kirildi va token qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Elektron pochtangizni tasdiqladingiz!
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Email yoki parol yuborilmagan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email va parol yuborilishi kerak!
 *       401:
 *         description: Email yoki parol noto‘g‘ri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email yoki parol noto`g`ri!
 *       403:
 *         description: Email hali tasdiqlanmagan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email tasdiqlanmagan! Iltimos, tasdiqlang.
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tizimga kirishda xatolik yuz berdi!
 */
authRouter.post("/login",login)

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Parolni tiklash kodi yuborish
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Parolni tiklash kodi emailingizga yuborildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 xabar:
 *                   type: string
 *                   example: Parolni tiklash kodi emailingizga yuborildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 xabar:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Parolni tiklashda xatolik yuz berdi!
 */
authRouter.post("/forgot_password",forgotPassword)

/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Parolni yangilash (reset kodi bilan)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               code:
 *                 type: string
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 example: NewStrongPassword123
 *     responses:
 *       200:
 *         description: Parol muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 xabar:
 *                   type: string
 *                   example: Parol muvaffaqiyatli yangilandi
 *       400:
 *         description: Yaroqsiz yoki muddati o‘tgan kod, yoki noto‘liq ma'lumotlar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Yaroqsiz yoki muddati o`tgan kod
 *       500:
 *         description: Server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Parolni yangilashda xatolik yuz berdi!
 */
authRouter.put("/change_password",changePassword)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Tizimdan chiqish (logout)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Foydalanuvchi tizimdan chiqdi, cookie o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tizimdan muvaffaqiyatli chiqdingiz!
 *       400:
 *         description: Email yuborilmagan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email kerak!
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi!
 *       500:
 *         description: Server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tizimdan chiqishda xatolik yuz berdi!
 */
authRouter.post("/logout",logout)

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Tokenlarni yangilash (access va refresh tokenlar)
 *     tags:
 *       - Auth
 *     description: Brauzerdagi refresh token orqali yangi access va refresh tokenlar hosil qiladi.
 *     responses:
 *       200:
 *         description: Tokenlar muvaffaqiyatli yangilandi va cookie orqali yuborildi
 *         headers:
 *           Set-Cookie:
 *             description: Yangi accessToken va refreshToken cookie'lari
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tokenlar yangilandi
 *       401:
 *         description: Token topilmadi yoki yaroqsiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token topilmadi
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serverda xatolik yuz berdi!
 */

authRouter.post("/refresh",refreshTokenMiddleware)


module.exports=authRouter