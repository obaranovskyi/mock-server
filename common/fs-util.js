const fs = require('fs');


module.exports = {
	dirNames(source) {
		const dirs = fs.readdirSync(source, { withFileTypes: true });

		return dirs
		  .filter((dir) => {
			return dir.isDirectory();
		  })
		  .map((dir) => {
			return dir.name;
		  });
	  }
}