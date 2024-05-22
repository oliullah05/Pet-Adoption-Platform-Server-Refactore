// import { Server } from "https"
import app from "./app"
import config from "./app/config";
const port = config.port || 3000;


async function main() {
 app.listen(port, () => {
        console.log(`Pet Adoption is running on port ${port}`);
    })
}

main()




