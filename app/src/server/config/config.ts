const yaml = require('js-yaml');
const fs = require('fs');

export let config: any = {};
try {
    config = yaml.safeLoad(fs.readFileSync(__dirname+'/config.yml', 'utf8'));
} catch (e) {
    console.log(e);
}
