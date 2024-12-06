const express = require("express");
const multer = require("multer");
const { Firestore } = require("@google-cloud/firestore");
const uuid = require("uuid");
const tf = require("@tensorflow/tfjs-node");
const router = express.Router();

const firestore = new Firestore({
    databaseId: "predictions",
});
const upload = multer({ storage: multer.memoryStorage() });

router.post("/predict", upload.single("image"), async (req, res) => {
    const image = req.file;

    if (!image) {
        return res.status(400).json({
            status: "fail",
            message: "No image were uploaded",
        });
    }

    if (image.size > 1024 * 1024) {
        return res.status(413).json({
            status: "fail",
            message:
                "Payload content length greater than maximum allowed: 1000000",
        });
    }

    try {
        const tensor = tf.node
            .decodeImage(image.buffer)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = req.app.locals.model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
        const isCancer = confidenceScore > 50;
        const data = {
            id: uuid.v7(),
            result: isCancer ? "Cancer" : "Non-cancer",
            suggestion: isCancer
                ? "Segera periksa ke dokter!"
                : "Penyakit kanker tidak terdeteksi.",
            createdAt: new Date().toISOString(),
        };

        await firestore.collection("predictions").doc(data.id).set(data);

        return res.status(201).json({
            status: "success",
            message: "Model is predicted successfully",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: "Terjadi kesalahan dalam melakukan prediksi",
        });
    }
});

router.get("/predict/histories", async (req, res) => {
    const result = await firestore.collection("predictions").get();
    return res.send({
        status: "success",
        data: result.docs.map((doc) => doc.data()),
    });
});

module.exports = router;
