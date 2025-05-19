const Router = require("express")
const { createCategory, getCategory, getOneCategory, updateCategory, deleteCategory } = require("../Controller/category.controller")
const validatorCategory = require("../Middleware/category.middleware")
const chekAdmin = require("../Middleware/accesstoken.middleware")

const categoryRouter = Router()

/**
 * @swagger
 * /get_category:
 *   get:
 *     summary: Kategoriyalar ro‘yxatini olish
 *     tags:
 *       - Categories
 *     description: Barcha kategoriyalarni olish. Kategoriyalar mavjud bo‘lmasa, 400 xato kodi qaytariladi.
 *     responses:
 *       200:
 *         description: Kategoriyalar muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60e2fa3b9b1f4c001f9e6e3b
 *                   markasi:
 *                     type: string
 *                     example: Toyota
 *       400:
 *         description: Kategoriyalar topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoryalar topilmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoriyalarni korishda xatolik yuz berdi!
 */
categoryRouter.get("/get_category",getCategory)
/**
 * @swagger
 * /get_one_category/{id}:
 *   get:
 *     summary: Bitta kategoriya va uning mashinalarini olish
 *     tags:
 *       - Categories
 *     description: Bitta kategoriya va shu kategoriyaga tegishli mashinalarni olish.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Kategoriya ID raqami
 *         schema:
 *           type: string
 *           example: 60e2fa3b9b1f4c001f9e6e3b
 *     responses:
 *       200:
 *         description: Kategoriya va tegishli mashinalar muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60e2fa3b9b1f4c001f9e6e3b
 *                     markasi:
 *                       type: string
 *                       example: Toyota
 *                 madellari:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66120a2b13f89a001fe98b57
 *                       model:
 *                         type: string
 *                         example: Corolla
 *                       year:
 *                         type: number
 *                         example: 2020
 *                       color:
 *                         type: string
 *                         example: Qora
 *       400:
 *         description: Kategoriya topilmadi yoki ma'lumotlarni olishda xatolik
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categorya topilmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoriyani korishda xatolik yuz berdi!
 */
categoryRouter.get("/get_one_category/:id",getOneCategory)
/**
 * @swagger
 * /create_category:
 *   post:
 *     summary: Yangi kategoriya yaratish
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     description: Yangi mashina markasini yaratish. Faqat adminlar yaratishi mumkin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               markasi:
 *                 type: string
 *                 description: Yangi kategoriya uchun mashina markasi
 *                 example: Toyota
 *     responses:
 *       201:
 *         description: Yangi kategoriya muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Yangi mashina markasi qoshildi
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60e2fa3b9b1f4c001f9e6e3b
 *                     markasi:
 *                       type: string
 *                       example: Toyota
 *                     adminId:
 *                       type: string
 *                       example: 60e2fa3b9b1f4c001f9e6e3b
 *       400:
 *         description: Markasi bazada mavjud yoki foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bu moshina markasi bazada mavjud!
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
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categorya qoshishda xatolik yuz berdi!!!
 */
categoryRouter.post("/create_category",[chekAdmin,validatorCategory],createCategory)
/**
 * @swagger
 * /update_category/{id}:
 *   put:
 *     summary: Kategoriya ma'lumotlarini yangilash
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     description: Kategoriya ma'lumotlarini yangilash. Faqat adminlar tomonidan amalga oshirilishi mumkin.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Yangilanishi kerak bo'lgan kategoriya ID raqami
 *         schema:
 *           type: string
 *           example: 60e2fa3b9b1f4c001f9e6e3b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               markasi:
 *                 type: string
 *                 description: Kategoriya markasi
 *                 example: Honda
 *     responses:
 *       201:
 *         description: Kategoriya muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoriya ma`lumotlari yangilandi
 *       400:
 *         description: Kategoriya topilmadi yoki yangilanishda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categorya topilmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categorya malumotlarini o`zgartirishda xatolik yuz berdi!!!
 */
categoryRouter.put("/update_category/:id",chekAdmin,updateCategory)
/**
 * @swagger
 * /delete_category/{id}:
 *   delete:
 *     summary: Kategoriya o'chirish
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     description: Kategoriya ma'lumotlarini o'chirish. Faqat adminlar tomonidan amalga oshirilishi mumkin.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O'chirilishi kerak bo'lgan kategoriya ID raqami
 *         schema:
 *           type: string
 *           example: 60e2fa3b9b1f4c001f9e6e3b
 *     responses:
 *       201:
 *         description: Kategoriya muvaffaqiyatli o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoriya o`chirildi
 *       400:
 *         description: Kategoriya topilmadi yoki o'chirishda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categorya topilmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoryani o`chirishda xatolik yuz berdi!!!
 */
categoryRouter.delete("/delete_category/:id",chekAdmin,deleteCategory)



module.exports = categoryRouter