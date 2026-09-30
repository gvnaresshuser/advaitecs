import "dotenv/config";

import cors from "cors";
import express from "express";

//import aiRoutes from "./routes/ai.routes.js"; - NO NEED FOR THIS

//STAGE - 1
//import aiRoutes from "./routes/ai.routes-gemini.js";//WORKING WITH OUTPUT - TOO BUSY
/*
Gemini API error: ApiError: {"error":{"code":503,"message":"This model is 
currently experiencing high demand. Spikes in demand are usually temporary. 
Please try again later.","status":"UNAVAILABLE"}}
*/
//---------------------------------------------------
//STAGE - 2
//import aiRoutes from "./routes/ai.routes-openai.js";//WORKING WITH OUTPUT
/*
Gemini OpenAI-compatible API error: InternalServerError: 503 [{"error":{"code":503,
"message":"This model is currently experiencing high demand. Spikes in demand 
are usually temporary. Please try again later.","status":"UNAVAILABLE"}}]
*/
//---------------------------------------------------
//STAGE - 3
//import aiRoutes from "./routes/ai.routes-openai-native.js";//WORKING BUT - OpenAI API error: RateLimitError: 429 You have no credits remaining. 
/*
OpenAI API error: RateLimitError: 429 You have no credits remaining. 
Add credits to continue using the API at 
https://platform.openai.com/settings/organization/billing/.
*/
//---------------------------------------------------
//STAGE - 4
import aiRoutes from "./routes/ai.routes-nvidia.js";//WORKING WITH OUTPUT - PERFECTLY
//---------------------------------------------------

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});