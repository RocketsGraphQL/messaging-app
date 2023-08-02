import { createClient } from "@rocketgraphql/rocketgraph-js-sdk";

const config = {
  baseURL: "https://backend-VF0GS3Q.rocketgraph.app/auth",
};

const { auth } = createClient(config);

export { auth };