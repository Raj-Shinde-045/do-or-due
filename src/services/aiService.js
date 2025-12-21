import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

// Cache the model so we don't reload it every time
let model = null;

const loadModel = async () => {
  if (!model) {
    console.log("Loading MobileNet model...");
    try {
      model = await mobilenet.load({
        version: 2,
        alpha: 1.0
      });
      console.log("MobileNet model loaded.");
    } catch (err) {
      console.error("Failed to load MobileNet:", err);
      throw new Error("Could not load AI model. Please check your internet connection.");
    }
  }
  return model;
};

export const verifyProof = async (file, objective) => {
  try {
    const net = await loadModel();

    // 1. Create an HTMLImageElement from the file
    const img = await fileToImage(file);

    // 2. Classify the image
    const predictions = await net.classify(img);
    console.log("AI Predictions:", predictions);

    // 3. Simple Keyword Matching
    // objective: "Drink Coffee" -> keywords: ["coffee", "drink", "cup", "mug"]
    const objectiveKeywords = objective.toLowerCase().split(' ').map(w => w.trim());

    // Add common related terms (very basic synonym map for demo purposes)
    const commonSynonyms = {
      "drink": ["cup", "mug", "glass", "bottle", "beverage", "liquid"],
      "eat": ["food", "plate", "dish", "meal", "fruit", "vegetable"],
      "run": ["shoe", "sneaker", "road", "street", "leg"],
      "read": ["book", "paper", "text", "novel"],
      "work": ["laptop", "computer", "notebook", "desk", "keyboard"],
      "gym": ["weight", "dumbbell", "barbell", "machine", "fitness"]
    };

    let extendedKeywords = [...objectiveKeywords];
    objectiveKeywords.forEach(word => {
      if (commonSynonyms[word]) {
        extendedKeywords = [...extendedKeywords, ...commonSynonyms[word]];
      }
    });

    // Check if any prediction class name contains any objective keyword
    const matched = predictions.some(p => {
      const className = p.className.toLowerCase();
      return extendedKeywords.some(keyword => className.includes(keyword));
    });

    // Return result
    if (matched) {
      // Find the exact match for reasoning
      const match = predictions.find(p => {
        const className = p.className.toLowerCase();
        return extendedKeywords.some(keyword => className.includes(keyword));
      });
      return {
        verified: true,
        reason: `AI detected '${match.className}' which matches your goal.`
      };
    } else {
      return {
        verified: false,
        reason: `AI saw: ${predictions.map(p => p.className).slice(0, 2).join(", ")}. Does not match '${objective}'.`
      };
    }

  } catch (error) {
    console.error("Local Verification Failed:", error);
    throw new Error("Verification service failed: " + error.message);
  }
};

async function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.onload = () => resolve(img);
      img.onerror = reject;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
