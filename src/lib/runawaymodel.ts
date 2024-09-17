import { Runware } from "@runware/sdk-js";

const apiKey = process.env.RUNWARE_API_KEY;

if (!apiKey) {
  throw Error("RUNWARE_API_KEY is not set");
}

const runware = new Runware({
  apiKey,
});

export default runware;
