"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const core = require("@actions/core");
const axios_1 = require("axios");
const fs = require("fs");
async function run() {
    try {
        //inputs
        const nexusUrl = core.getInput('nexus_url');
        const username = core.getInput('username');
        const password = core.getInput('password');
        const file_path = core.getInput('file_path');
        const artifact_id = core.getInput('artifact_id');
        const group_id = core.getInput('group_id');
        const version = core.getInput('version');
        const repository_id = core.getInput('repository_id');
        // Leitura do arquivo
        const artifact = fs.readFileSync(file_path);
        //Autenticação
        const auth = {
            username: username,
            password: password
        };
        // enviando artefato
        const response = await axios_1.default.put(`${nexusUrl}/repository/${repository_id}/${group_id}/${artifact_id}/${version}`, artifact, {
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            auth: auth
        });
        core.info(`Upload successful: ${response.status}`);
    }
    catch (error) {
        core.setFailed(`Action failed: ${error.message}`);
    }
}
run();
