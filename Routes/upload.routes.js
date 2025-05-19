const express = require("express");
const path = require("path");
const { categoryImg, carFonImg, interiorImg, exteriorImg } = require("../Controller/upload.controller");
const chekAdmin = require("../Middleware/accesstoken.middleware");

const uploadRouter = express.Router();

const uploadFile = path.join(__dirname, "../uploadsFile/images");

uploadRouter.use("/upload/images", express.static(uploadFile));

/**
 * @swagger
 * /upload/category_img/{id}/image:
 *   post:
 *     summary: Kategoriya rasmni yuklash
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     description: Kategoriya uchun rasmni yuklash. Faqat adminlar tomonidan amalga oshirilishi mumkin.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Kategoriya ID raqami, bu kategoriya uchun rasm yuklanadi
 *         schema:
 *           type: string
 *           example: 60e2fa3b9b1f4c001f9e6e3b
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category_img:
 *                 type: string
 *                 format: binary
 *                 description: Kategoriya rasmi
 *     responses:
 *       200:
 *         description: Rasm muvaffaqiyatli yuklandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category rasmi yuklandi!
 *                 file:
 *                   type: string
 *                   example: /upload/images/category123.jpg
 *       400:
 *         description: Rasm yuklanmadi yoki xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rasm yuklanmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rasmni yuklashda xatolik yuz berdi
 */
uploadRouter.post("/upload/category_img", chekAdmin, ...categoryImg);

/**
 * @swagger
 * /upload/car_fon_img/{id}/background-image:
 *   post:
 *     summary: Mashina fon rasmini yuklash
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     description: Mashina uchun fon rasmni yuklash. Faqat adminlar tomonidan amalga oshirilishi mumkin.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Mashina ID raqami, bu mashina uchun fon rasm yuklanadi
 *         schema:
 *           type: string
 *           example: 60e2fa3b9b1f4c001f9e6e3b
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               car_fon_img:
 *                 type: string
 *                 format: binary
 *                 description: Mashina fon rasmi
 *     responses:
 *       200:
 *         description: Rasm muvaffaqiyatli yuklandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car fon rasmi yuklandi!
 *                 file:
 *                   type: string
 *                   example: /upload/images/carfon123.jpg
 *       400:
 *         description: Rasm yuklanmadi yoki xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rasm yuklanmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rasmni yuklashda xatolik yuz berdi
 */
uploadRouter.post("/upload/car_fon_img",chekAdmin,  ...carFonImg);

/**
 * @swagger
 * /upload/interior_img/{id}/interior-image:
 *   post:
 *     summary: Mashina ichki rasmini yuklash
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     description: Mashina ichki rasmni yuklash. Faqat adminlar tomonidan amalga oshirilishi mumkin.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Mashina ID raqami, bu mashina uchun ichki rasm yuklanadi
 *         schema:
 *           type: string
 *           example: 60e2fa3b9b1f4c001f9e6e3b
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               interior_img:
 *                 type: string
 *                 format: binary
 *                 description: Mashina ichki rasmi
 *     responses:
 *       200:
 *         description: Rasm muvaffaqiyatli yuklandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Interior rasmi yuklandi!
 *                 file:
 *                   type: string
 *                   example: /upload/images/interior123.jpg
 *       400:
 *         description: Rasm yuklanmadi yoki xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rasm yuklanmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rasmni yuklashda xatolik yuz berdi
 */
uploadRouter.post("/upload/interior_img",chekAdmin, ...interiorImg);

/**
 * @swagger
 * /upload/exterior_img/{id}/exterior-image:
 *   post:
 *     summary: Mashina tashqi rasmini yuklash
 *     tags:
 *       - Cars
 *     security:
 *       - bearerAuth: []
 *     description: Mashina tashqi rasmni yuklash. Faqat adminlar tomonidan amalga oshirilishi mumkin.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Mashina ID raqami, bu mashina uchun tashqi rasm yuklanadi
 *         schema:
 *           type: string
 *           example: 60e2fa3b9b1f4c001f9e6e3b
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               exterior_img:
 *                 type: string
 *                 format: binary
 *                 description: Mashina tashqi rasmi
 *     responses:
 *       200:
 *         description: Rasm muvaffaqiyatli yuklandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Exterior rasmi yuklandi!
 *                 file:
 *                   type: string
 *                   example: /upload/images/exterior123.jpg
 *       400:
 *         description: Rasm yuklanmadi yoki xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rasm yuklanmadi!
 *       500:
 *         description: Serverda xatolik yuz berdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rasmni yuklashda xatolik yuz berdi
 */
uploadRouter.post("/upload/exterior_img",chekAdmin, ...exteriorImg);

module.exports = uploadRouter;






