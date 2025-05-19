const Router = require("express")
const { createCar, getCars, getOneCar, updateCar, deleteCar } = require("../Controller/cars.controller")
const validatorCars = require("../Middleware/cars.middleware")
const chekAdmin = require("../Middleware/accesstoken.middleware")

const carsRouter = Router()


/**
 * @swagger
 * /get_cars:
 *   get:
 *     summary: Barcha mashinalarni olish
 *     tags:
 *       - Cars
 *     description: Barcha mavjud mashinalarni ro‘yxatini qaytaradi.
 *     responses:
 *       200:
 *         description: Mashinalar muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 66120a2b13f89a001fe98b57
 *                   name:
 *                     type: string
 *                     example: Chevrolet Malibu
 *                   year:
 *                     type: number
 *                     example: 2022
 *                   price:
 *                     type: number
 *                     example: 25000
 *       400:
 *         description: Mashinalar topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mashinalar topilmadi!
 *       500:
 *         description: Server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mashinalar ma`lumotlari topilmadi
 */

carsRouter.get("/get_cars",getCars)

/**
 * @swagger
 * /get_one_car/{id}:
 *   get:
 *     summary: Bitta mashinani olish
 *     tags:
 *       - Cars
 *     description: ID orqali bitta mashina haqida to‘liq ma’lumotni qaytaradi.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Mashinaning unikal ID raqami
 *         schema:
 *           type: string
 *           example: 66120a2b13f89a001fe98b57
 *     responses:
 *       200:
 *         description: Mashina muvaffaqiyatli topildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 66120a2b13f89a001fe98b57
 *                 name:
 *                   type: string
 *                   example: Chevrolet Malibu
 *                 year:
 *                   type: number
 *                   example: 2022
 *                 price:
 *                   type: number
 *                   example: 25000
 *       400:
 *         description: Mashina topilmadi yoki xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mashina topilmadi!
 *       500:
 *         description: Server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: GetOneCar bo`yicha xatolik!!!
 */
carsRouter.get("/get_one_car/:id",getOneCar)

/**
 * @swagger
 * /create_car:
 *   post:
 *     summary: Yangi mashina qo‘shish
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     description: Faqat admin foydalanuvchi yangi mashina modelini qo‘shishi mumkin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - markasi
 *               - model
 *               - year
 *               - motor
 *               - distance
 *               - color
 *               - tanirovkasi
 *               - gearBook
 *               - description
 *               - narxi
 *             properties:
 *               markasi:
 *                 type: string
 *                 example: Chevrolet
 *               model:
 *                 type: string
 *                 example: Malibu
 *               year:
 *                 type: number
 *                 example: 2022
 *               motor:
 *                 type: string
 *                 example: 2.4L Turbo
 *               distance:
 *                 type: number
 *                 example: 15000
 *               color:
 *                 type: string
 *                 example: Oq
 *               tanirovkasi:
 *                 type: string
 *                 example: Bor
 *               gearBook:
 *                 type: string
 *                 example: Avtomat
 *               description:
 *                 type: string
 *                 example: Yangi holatda, holati a'lo
 *               narxi:
 *                 type: number
 *                 example: 23000
 *     responses:
 *       201:
 *         description: Mashina muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Yangi mashina madeli qoshildi
 *                 car:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6622134a9ac8b2002134a123
 *                     markasi:
 *                       type: string
 *                       example: Chevrolet
 *                     model:
 *                       type: string
 *                       example: Malibu
 *       400:
 *         description: Noto‘g‘ri so‘rov yoki mavjud bo‘lmagan markasi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mashina markasi topilmadi!
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
 */
carsRouter.post("/create_car",[chekAdmin,validatorCars],createCar)

/**
 * @swagger
 * /update_car/{id}:
 *   put:
 *     summary: Mashina ma'lumotlarini yangilash
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     description: Mashinaning ma'lumotlarini ID orqali yangilaydi. Faqat adminlar foydalanishi mumkin.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Yangilanishi kerak bo‘lgan mashinaning unikal ID raqami
 *         schema:
 *           type: string
 *           example: 66120a2b13f89a001fe98b57
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               markasi:
 *                 type: string
 *                 example: Chevrolet
 *               model:
 *                 type: string
 *                 example: Malibu
 *               year:
 *                 type: number
 *                 example: 2023
 *               motor:
 *                 type: string
 *                 example: 3.0L V6
 *               distance:
 *                 type: number
 *                 example: 12000
 *               color:
 *                 type: string
 *                 example: Qora
 *               tanirovkasi:
 *                 type: string
 *                 example: Bor
 *               gearBook:
 *                 type: string
 *                 example: Avtomat
 *               description:
 *                 type: string
 *                 example: Yangi holatda, holati a'lo
 *               narxi:
 *                 type: number
 *                 example: 25000
 *     responses:
 *       200:
 *         description: Mashina muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mashina ma`lumotlari yangilandi
 *       400:
 *         description: Mashina topilmadi yoki ma'lumotlar noto‘g‘ri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mashinalar topilmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: UpdateCar bo`yicha xatolik!!!
 */
carsRouter.put("/update_car/:id",chekAdmin,updateCar)

/**
 * @swagger
 * /dalete_car/{id}:
 *   delete:
 *     summary: Mashina ma'lumotlarini o'chirish
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     description: Mashinani ID orqali o'chirish. Faqat adminlar foydalanishi mumkin.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O'chirilishi kerak bo‘lgan mashinaning unikal ID raqami
 *         schema:
 *           type: string
 *           example: 66120a2b13f89a001fe98b57
 *     responses:
 *       200:
 *         description: Mashina muvaffaqiyatli o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mashina ma`lumotlari o`chirildi
 *       400:
 *         description: Mashina topilmadi yoki o'chirishda xatolik
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mashinalar topilmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: DeleteCar bo`yicha xatolik!!!
 */
carsRouter.delete("/dalete_car/:id",chekAdmin,deleteCar)



module.exports = carsRouter