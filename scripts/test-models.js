
const API_KEY = "AIzaSyBpfuYvN5DreeqfvqS90LYb1ck9MR2XthM";

async function listModels() {
    try {
        console.log("Fetching models...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();

        if (data.models) {
            console.log("SUCCESS. Valid Models:");
            data.models.forEach(m => {
                console.log(m.name.replace('models/', ''));
            });
        } else {
            console.log("API Error:", JSON.stringify(data));
        }
    } catch (error) {
        console.error("Fetch Error:", error.message);
    }
}

listModels();
