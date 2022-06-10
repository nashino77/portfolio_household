import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

// キャメルケース スネークケース変換
// headerは適用無視
const options = { ignoreHeaders: true };

  export const client = applyCaseMiddleware(axios.create(), options);