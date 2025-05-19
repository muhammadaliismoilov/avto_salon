const Router = require("express")
const { getUser, getOneUser, createUser, updateUser, deleteUser } = require("../Controller/user.controller")
const validatorUser = require("../Middleware/user.middleware")
const chekAdmin = require("../Middleware/accesstoken.middleware")


const userRouter = Router()

/**
 * @swagger
 * /get_users:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     description: Barcha foydalanuvchilarni olish. Faqat adminlar uchun.
 *     responses:
 *       200:
 *         description: Barcha foydalanuvchilar muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Foydalanuvchi ID
 *                   userName:
 *                     type: string
 *                     description: Foydalanuvchi ismi
 *                   email:
 *                     type: string
 *                     description: Foydalanuvchi email manzili
 *                   role:
 *                     type: string
 *                     description: Foydalanuvchi roli (admin, user)
 *       400:
 *         description: Foydalanuvchilarni olishda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foydalanuvchilar ma`lumotlari topilmadi
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serverda xatolik yuz berdi
 */
userRouter.get("/get_users",chekAdmin,getUser)

/**
 * @swagger
 * /get_one_user/{id}:
 *   get:
 *     summary: Bir foydalanuvchini olish
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     description: ID bo‘yicha foydalanuvchi ma‘lumotlarini olish. Agar foydalanuvchi admin yoki superadmin bo‘lsa, unga tegishli mashinalar va kategoriyalarni ham ko‘rsatadi.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Foydalanuvchi ID-si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi va unga tegishli ma‘lumotlar muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Foydalanuvchi ma'lumotlari
 *                 categorys:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Admin tomonidan yaratilgan kategoriyalar
 *                 cars:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Admin tomonidan qo‘shilgan mashinalar
 *       400:
 *         description: Foydalanuvchi topilmadi yoki boshqa xatolik
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serverda xatolik yuz berdi
 */
userRouter.get("/get_one_user/:id",getOneUser)

/**
 * @swagger
 * /update_user/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     description: Foydalanuvchi ID si bo‘yicha foydalanuvchi ma‘lumotlarini yangilash.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanishi kerak bo‘lgan foydalanuvchi ID-si
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         description: Yangilangan foydalanuvchi ma'lumotlari
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Foydalanuvchi ismi
 *             email:
 *               type: string
 *               description: Foydalanuvchi email manzili
 *             role:
 *               type: string
 *               description: Foydalanuvchi roli
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma‘lumotlari muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Foydalanuvchi ID-si
 *                 name:
 *                   type: string
 *                   description: Foydalanuvchi ismi
 *                 email:
 *                   type: string
 *                   description: Foydalanuvchi email manzili
 *                 role:
 *                   type: string
 *                   description: Foydalanuvchi roli
 *       400:
 *         description: Foydalanuvchi topilmadi yoki boshqa xatolik
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serverda xatolik yuz berdi
 */
userRouter.put("/update_user/:id",updateUser)

/**
 * @swagger
 * /delete_user/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     description: Berilgan ID bo'yicha foydalanuvchini o'chirish.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan foydalanuvchi ID-si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: O'chirilgan foydalanuvchi ID-si
 *                 name:
 *                   type: string
 *                   description: O'chirilgan foydalanuvchi ismi
 *                 email:
 *                   type: string
 *                   description: O'chirilgan foydalanuvchi email manzili
 *                 role:
 *                   type: string
 *                   description: O'chirilgan foydalanuvchi roli
 *       400:
 *         description: Foydalanuvchi topilmadi yoki xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foydalanuvchi topilmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Serverda xatolik yuz berdi
 */
userRouter.delete("/delete_user/:id",deleteUser)

module.exports = userRouter