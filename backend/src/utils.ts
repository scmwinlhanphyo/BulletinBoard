import path from "path";
import fs from "fs";

export const rootDir = path.join(__dirname, "..");

export const deleteFile = (fileName: string) => {
    fs.unlink(path.join(rootDir, fileName), (err) => {
        if (err) console.log(err);
    });
};