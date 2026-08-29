import ImageKit, { toFile } from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile({ buffer, filename, folder = "snitch" }) {
  try {
    return await client.files.upload({
      file: await toFile(buffer),
      filename,
      folder,
    });
  } catch (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }
}
