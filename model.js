const tf = require("@tensorflow/tfjs-node");

const modelURL = process.env.MODEL_URL;

const load = async () => {
    return await tf.loadGraphModel(modelURL);
};

module.exports.load = load;
