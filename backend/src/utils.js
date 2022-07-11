"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.rootDir = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.rootDir = path_1.default.join(__dirname, "..");
const deleteFile = (fileName) => {
    fs_1.default.unlink(path_1.default.join(exports.rootDir, fileName), (err) => {
        if (err)
            console.log(err);
    });
};
exports.deleteFile = deleteFile;
